import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class App extends React.Component {
  constructor(props)
  {
    super(props);

    // Initialize state; don't use setState in constructor!    
    this.state = { count: 0 };
  }

  render() {
    // Fetch current count
    const count = this.state.count;
    
    // Build UI
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{count}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight style={styles.button} onPress={() => this.onIncrement()}>
            <Text style={styles.buttonLabel}>+</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => this.onDecrement()}>
            <Text style={styles.buttonLabel}>-</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => this.onReset()}>
            <Text style={styles.buttonLabel}>0</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  // Called when user presses + button
  onIncrement()
  {    
    this.setState( {count: this.state.count + 1} );
  }
  
  // Called when user presses - button
  onDecrement()
  {
    this.setState( {count: this.state.count - 1} );
  }
  
  // Called when user presses 0 button
  onReset()
  {
    this.setState( {count: 0} );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 10,
    justifyContent: 'center'
  },
  text: {
    fontSize: 100,    
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row'
  }, 
  button: {
    flex: 1,
    backgroundColor: '#AAA',
    margin: 5,
    justifyContent: 'center'
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 20
  }
});
