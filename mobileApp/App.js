import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
      createStackNavigator,
      createAppContainer
    } from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import addshop from './components/addshop';

/*export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
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
*/

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    AddShop: addshop,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const App = createAppContainer(RootStack);
export default App;
