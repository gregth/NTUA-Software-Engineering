import React, { Component } from "react";
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { GeolocatedProps, geolocated } from 'react-geolocated';

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
  });
};

class MapPage extends Component{
  componentDidMount() {
    return getCurrentLocation().then(position => {
      if (position) {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          },
        });
      }
    }
    )
  }
  static navigationOptions = {
    title: 'Τωρινή τοποθεσία',
  };
  render() {
    return (
        <MapView
         style = {styles.map}
         showsUserLocation = {true} 
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
