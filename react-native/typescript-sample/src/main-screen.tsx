import React from 'react';
import { StyleSheet, Text, View } from 'react-native';



export class MainScreen extends React.Component<any, any> {
  render() {
    return <View style={styles.container}>
             <Text>Hello from TypeScript</Text>
           </View>
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});