import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IPv4Control from './IPv4Control';


export default class App extends React.Component {
  constructor(props)
  {
    super(props);

    this.state = {address: [1,2,3,4]};
  }

  render() {
    const formattedAddress = this.formatAddress();

    return (
      <View style={styles.container}>
        <IPv4Control style={{margin: 5}} address={this.state.address} onAddressChanged={this.onAddressChanged.bind(this)} />
        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 32}}>{formattedAddress}</Text>
        </View>
      </View>
    );
  }

  onAddressChanged(address)
  {
    this.setState({address});
  }

  formatAddress()
  {
    return this.state.address.map(x => x ? x.toString() : "[?]").join(".");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 10
  },
});
