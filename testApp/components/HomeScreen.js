import React, { Component } from 'react';
import { Button, View, ScrollView, Text, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import { SearchBar, Overlay, Slider, ButtonGroup, Tile } from 'react-native-elements'
import { GeolocatedProps, geolocated } from 'react-geolocated';
import Geocode from 'react-geocode';

class HomeScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
    text:'',
    price: 0,
    isVisible:true,
    selectedIndex:-1};
    this.updateIndex = this.updateIndex.bind(this)
    this.handleLogIn = this.handleLogIn.bind(this)
  }
  updateIndex (selectedIndex) {
    this.setState({selectedIndex: selectedIndex})
  }
  handleLogIn(selectedIndex) {
    this.setState({selectedIndex:selectedIndex})
    if(selectedIndex==0){
      this.props.navigation.navigate('Login')
    }
    else if(selectedIndex==1){
      this.props.navigation.navigate('Register')
    }
    else{
      Alert.alert('You tapped the button!')
    }
  }

  static navigationOptions = {
    title: 'Home',
  };

  render(){
    return(
      <Overlay> //isVisible={this.state.isVisible}>
      <Text>Hello from Overlay!</Text>
      </Overlay>

    );
  }

  render() {
    let data = [{
      value: 'Κρασί',
    }, {
      value: 'Μπύρες',
    }, {
      value: 'Βότκα',
    }, {
      value: 'Ουίσκι',
    },{
      value: 'Ρούμι',
    }, {
      value: 'Gin',
    },{
      value: 'Τεκίλα',
    },{
      value: 'Aναψυκτικά',
    },{
      value: 'Snacks',
    },{
      value: 'Χωρίς Αλκοόλ',
    }];

    const buttons = ['Σύνδεση', 'Εγγραφή']
    const { selectedIndex } = this.state


    return (
      <View style={{flex: 2, marginHorizontal:15}}>
      <ButtonGroup style={{right:40}}
        onPress={this.handleLogIn}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{height: 20, width:150, left:175}}
        />


      // <Tile
      //   imageSrc={require('./logo_transparent.png')}
      //   containerStyle={{width:500, height:200}}
      //   />

      <Text style={{textAlign:'center'}}>Alcowatch</Text>

      <Dropdown
        label ='Επιλογή Κατηγορίας'
        data={data}
        />

      <SearchBar
        lightTheme
        onChangeText={(text) => this.setState({text : text})}
        onClear={(text) => this.setState({text : ''})}
        placeholder='Αναζήτηση με όνομα...'
        />

      <Slider
        value={this.state.price}
        maximumValue = {value = 150}
        onValueChange={(value) => this.setState({price : value})}
        />

      <Text> Μέγιστη Τιμή:{this.state.price.toFixed(2)}€</Text>

      <Button
        title="Εμφάνιση τοποθεσίας"
        onPress={() =>this.props.navigation.navigate('Map')}
        />

      </View>
    );
  }
}
export default HomeScreen;
