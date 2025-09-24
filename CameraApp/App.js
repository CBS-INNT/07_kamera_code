import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraTest from './screens/CameraTest';
import ImageScreen from './screens/ImageScreen';
import CameraTestSimple from './screens/CameraTestSimple';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'home'} component={CameraTest} options={{headerShown: false}} />
        <Stack.Screen name={'image'} component={ImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
