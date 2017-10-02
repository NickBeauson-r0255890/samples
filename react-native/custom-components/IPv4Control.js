import React from 'react';
import { Text, TextInput, View } from 'react-native';

export default class IPv4Control extends React.Component {
  static propTypes = {  
    address: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    onAddressChanged: React.PropTypes.func.isRequired,
    validBackgroundColor: React.PropTypes.string,
    invalidBackgroundColor: React.PropTypes.string,
  }

  constructor(props)
  {
    super(props);

    // Save address in state
    this.state = { address: props.address.map(x => x.toString()) };
  }

  render() {
    // Keeping copy of this is necessary for createInput() function
    const self = this;
    const style = {flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: 5};

    return (
      <View style={style}>
        {createInput(0)}
        <Text>.</Text>
        {createInput(1)}
        <Text>.</Text>
        {createInput(2)}
        <Text>.</Text>
        {createInput(3)}
      </View>
    );

    // Local helper function, only visible inside render()
    function createInput(index)
    {
      // Fetch byte from state
      const value = self.state.address[index];

      // Pick background color, indicating whether value is valid or not
      const validBackgroundColor = self.props.validBackgroundColor || '#AAA';
      const invalidBackgroundColor = self.props.invalidBackgroundColor || '#FAA';
      const backgroundColor = self.isValidByte(value) ? validBackgroundColor : invalidBackgroundColor;

      const style = {flex: 1, textAlign: 'center', backgroundColor, margin: 5};

      return <TextInput style={style} keyboardType='numeric' key={index} onChangeText={(newContents) => self.onByteUpdated(index, newContents)} value={value} />
    }
  }

  parseByte(string)
  {
    const value = parseFloat(string);

    if ( !isNaN(value) && Number.isInteger(value) && value >= 0 && value <= 255 )
    {
        return value;
    }
    else
    {
      return undefined;
    }
  }

  isValidByte(string)
  {
    return !!this.parseByte(string);
  }

  onByteUpdated(index, value)
  {
    // Make copy of address
    const address = this.state.address.slice();

    // Update byte
    address[index] = value;

    // Update state
    this.setState({address});

    this.notifyObservers(address);
  }

  notifyObservers(addressAsStrings)
  {
    const address = addressAsStrings.map(this.parseByte.bind(this));
    this.props.onAddressChanged(address);    
  }
}