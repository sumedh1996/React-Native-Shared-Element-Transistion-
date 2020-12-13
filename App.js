import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Easing, StyleSheet, Text, View } from 'react-native';
import Detail from './Screens/Detail';
import List from './Screens/List';
import { enableScreens } from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { NavigationContainer } from '@react-navigation/native';
import TravelListDetail from './Screens/TravelListDetail';
import TravelList from './Screens/TravelList';
import NavigationScreen from './Screens/NavigationScreen'
enableScreens();

const Stack = createSharedElementStackNavigator();
const options = () => ({
  gestureEnabled: false,
  transitionSpec: {
    open: { animation: "timing", config: { duration: 1000, easing: Easing.inOut(Easing.ease) } },
    close: { animation: "timing", config: { duration: 1000, easing: Easing.inOut(Easing.ease) } }
  },
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress
      }
    }
  }
})

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='TravelList' headerMode="none">
        <Stack.Screen name="NavigationScreen" component={NavigationScreen} />
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="Detail" component={Detail} options={options} />
        <Stack.Screen
          name="TravelList"
          component={TravelList}
        />
        <Stack.Screen
          name="TravelListDetail"
          component={TravelListDetail}
          options={options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
