import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, TouchableHighlight } from 'react-native';
import { StackNavigator } from 'react-navigation';


const ip = "192.168.0.142:8000";

export class SelectionScreen extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {quizId: ''};
  }

  render()
  {
    return <View style={{flex: 1, justifyContent: 'center'}}>
             <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
               <Text style={{flex: 1}}>Quiz Id:</Text>
               <TextInput onChangeText={this.onQuizIdChanged.bind(this)} style={{flex: 5, alignSelf: 'stretch'}}>{this.state.quizId}</TextInput>
             </View>
             <Button title="Go" onPress={() => this.onGo()} />
           </View>;
  }

  onQuizIdChanged(quizId)
  {
    this.setState({quizId});
  }

  onGo()
  {
    this.props.navigation.navigate('Quiz', {quizId: this.state.quizId})
  }
}


export class QuizScreen extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {};
  }

  getQuizId()
  {
    return this.props.navigation.state.params.quizId;
  }

  getUrl()
  {
    const quizId = this.getQuizId();
    return `http://${ip}/api/quiz/${quizId}`;
  }

  componentDidMount()
  {
    const url = this.getUrl();
    
    fetch(url).then(x => x.json()).then(x => this.onReceivedQuizData(x));
  }

  onReceivedQuizData(quiz)
  {
    this.setState({quiz});
  }

  render()
  {
    const quiz = this.state.quiz;

    if ( quiz )
    {
      const question = <Text style={{fontSize: 30, backgroundColor: '#AAF', textAlign: 'center'}}>{quiz.question}</Text>;

      const choices = Object.keys(quiz.choices).map( choice => {
        return <TouchableHighlight key={choice} onPress={() => this.onChoiceMade(choice)}>
                 <Text style={{textAlign: 'center', fontSize: 20, marginTop: 5, backgroundColor: '#AAA', padding: 10}}>
                   {choice}
                 </Text>
               </TouchableHighlight>;
      });

      return <View style={{flex: 1, justifyContent: 'center'}}>
                {question}
                <View>
                  {choices}
                </View>
             </View>;
    }
    else
    {
      return <Text>Loading</Text>
    }
  }

  onChoiceMade(choice)
  {
    const url = this.getUrl();
    const method = 'PUT';
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };
    const body = JSON.stringify({ choice });
    const args = { method, headers, body };

    fetch(url, args).then(x => this.props.navigation.navigate('Results', {quizId: this.getQuizId()}));
  }
}

export class ResultScreen extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {};
  }

  getUrl()
  {
    const quizId = this.props.navigation.state.params.quizId;
    return `http://192.168.0.142:8000/api/quiz/${quizId}`;
  }

  componentDidMount()
  {
    const url = this.getUrl();

    fetch(url).then(x => x.json()).then(x => this.onReceivedQuizData(x));
  }

  onReceivedQuizData(quiz)
  {
    this.setState({quiz});
  }

  render()
  {
    const quiz = this.state.quiz;

    if ( quiz )
    {
      const question = <Text style={{fontSize: 30, backgroundColor: '#AAF', textAlign: 'center'}}>{quiz.question}</Text>;

      const choices = Object.keys(quiz.choices).map( choice => {
        const count = quiz.choices[choice];

        return <Text key={choice} style={{textAlign: 'center', fontSize: 20, marginTop: 5, backgroundColor: '#AAA', padding: 10}}>
                 {choice}: {count}
               </Text>;               
      });

      return <View style={{flex: 1, justifyContent: 'center'}}>
                {question}
                <View>
                  {choices}
                </View>
             </View>;
    }
    else
    {
      return <Text>Loading</Text>
    }
  } 
}


export default App = StackNavigator({
  Selection: {screen: SelectionScreen},
  Quiz: {screen: QuizScreen},
  Results: {screen: ResultScreen}
});
