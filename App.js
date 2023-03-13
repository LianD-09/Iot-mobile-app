import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginLayout from './components/Auth/LogIn';
import SignUpLayout from './components/Auth/SignUp';
import Home from './components/Home/Home';
import { Provider } from 'react-redux';
import store from './app/store';

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Sign in"
            component={LoginLayout}
            options={{
              title: 'Sign in',
              headerStyle: {
                backgroundColor: '#ff5722',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Sign up"
            component={SignUpLayout}
            options={{
              title: 'Sign up', //Set Header Title
              headerStyle: {
                backgroundColor: '#3A5BB3', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
              },
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Home', //Set Header Title
              headerStyle: {
                backgroundColor: '#ff5722', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
