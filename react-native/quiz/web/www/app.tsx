import * as React from 'react';
import { render } from 'react-dom';

interface FrequencyMap
{
    [key : string] : number;
}

interface Quiz
{
    question: string;
    choices : FrequencyMap;
}

interface AppState
{
    readonly quizId? : string;
    readonly quizData? : Quiz;
    readonly voted: boolean;
}


class App extends React.Component<any, AppState>
{
    private oldQuizId : string;

    constructor(props : any)
    {
        super(props);

        this.oldQuizId = '';
        this.state = { voted: false };
    }

    onQuizChanged(id : string)
    {
        this.setState( { quizId: id } );
    }

    loadData()
    {
        const url = `/api/quiz/${this.state.quizId}`;
        fetch(url).then( x => x.json() ).then( x => this.onReceivedData(x) );
    }

    onReceivedData(data : Quiz)
    {
        const voted = this.oldQuizId === this.state.quizId;
        
        this.setState({ ...this.state, quizData: data, voted });
        this.oldQuizId = this.state.quizId || '';
    }

    renderQuizSelection()
    {
        return <div className="quiz-selection">
                 <input type="text" onChange={(e) => this.onQuizChanged(e.target.value)} />
                 <button onClick={this.loadData.bind(this)}>Load</button>
               </div>;
    }

    renderQuiz()
    {
        const self = this;
        
        if ( this.state.quizId && this.state.quizData )
        {
            const question = <div className="question">{this.state.quizData.question}</div>;
            const choices = renderChoices(this.state.quizId, this.state.quizData);
            
            return <div>{question}{choices}</div>;
        }


        function renderChoices(quizId : string, quiz : Quiz)
        {
            const choices = [];

            for ( let choice in quiz.choices )
            {
                const count = quiz.choices[choice];
                
                choices.push(renderChoice(quizId, choice, count));
            }
            
            return <table className="choices">
                     <tbody>
                      {choices}
                     </tbody>
                   </table>;
        }

        function renderChoice(quizId : string, choice : string, count : number)
        {
            return <tr key={choice}>
                     <td>
                       <button onClick={self.onChoicePicked.bind(self, quizId, choice)} className="choice">
                         {choice}
                       </button>
                     </td>
                     <td>
                       <span className="count">{count}</span>
                     </td>
                   </tr>;
        }
    }

    onChoicePicked(quizId : string, choice : string)
    {
        if ( !this.state.voted )
        {
            const url = `api/quiz/${quizId}`;
            const method = 'PUT';
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };
            const body = JSON.stringify({ choice });
            const args = { method, headers, body };

            fetch(url, args).then(x => x.json()).then(x => this.onReceivedData(x));
        }
    }
    
    render() {
        const quizSelection = this.renderQuizSelection();
        const quiz = this.renderQuiz();
        
        return <div>{quizSelection}{quiz}</div>;
    }
}

render(<App/>, document.getElementById('app'));