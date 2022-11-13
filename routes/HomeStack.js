import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from "../Screens/Home";
import SelectScreen from "../Screens/SelectScreen";
import Register from '../Screens/Register';
import BluetoothConnect from '../Screens/BluetoothConnect';


const Stack = createStackNavigator()

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name='Home' component={Home} options={{ title: 'Overview' }} />
        <Stack.Screen name='SelectScreen' component={SelectScreen} />
        <Stack.Screen name = 'Register' component={Register} />
        <Stack.Screen name = 'BluetoothConnect' component={BluetoothConnect} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}