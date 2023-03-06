import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CreateForm from '../../components/AssignApartment/CreateForm';
import ListForm from '../../components/AssignApartment/ListForm';

const Stack = createNativeStackNavigator();

const AssignApartment = (props) => {

  return (
    <Stack.Navigator >
      <Stack.Screen
        name="ListForm"
        component={ListForm}
        options={{
          title: 'My List Form',
          headerStyle: {
            backgroundColor: '#ff5722',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateForm"
        component={CreateForm}
        options={{
          title: 'Create Form',
          headerStyle: {
            backgroundColor: '#ff5722',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default AssignApartment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
})