import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';


export class ScreenA extends React.Component {
  static navigationOptions = {
    title: 'This is screen A',
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Button title="To B" onPress={() => this.goToB()} />
      </View>
    );
  }

  goToB()
  {
    this.props.navigation.navigate('B');
  }
}

export class ScreenB extends React.Component {
  static navigationOptions = {
    title: 'This is screen B',
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Contents of screen B</Text>
      </View>
    );
  }
}


export default App = StackNavigator({
  A: {screen: ScreenA},
  B: {screen: ScreenB}
});
