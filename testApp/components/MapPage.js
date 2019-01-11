import React, { Component } from "react";
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

class MapPage extends Component{
  static navigationOptions = {
    title: 'Τωρινή τοποθεσία',
  };
  render() {
    return (
        <MapView
         style = {styles.map}
         showsUserLocation = {false}
         followUserLocation = {false}
         zoomEnabled = {true}
      />
    );

  }
}

const styles = StyleSheet.create ({
   map: {
      height: 400,
      marginTop: 80
   }
})

export default MapPage;
