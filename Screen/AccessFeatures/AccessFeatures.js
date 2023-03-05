import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ApartmentScreen from '../../components/Apartment/ApartmentScreen';
import UserListApartment from '../../components/Apartment/UserListApartment';
import AccessHistoryScreen from '../../components/userAccessNotification/AccessHistoryScreen';
import { apartmentDataSelector } from '../../features/apartment/aparmentSlice';
import CreateHomeQR from '../QRCode/QRCodeScreen';

const Stack = createNativeStackNavigator();

const AccessFeatures = (props) => {
  const apartment = useSelector(apartmentDataSelector);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setFlag(apartment.isChoosen);
  }, [apartment])

  return (
    <Stack.Navigator initialRouteName='ListAparment'>
      <Stack.Screen
        name="ListApartment"
        component={UserListApartment}
        options={{
          title: 'List Apartment',
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
        name="Apartment"
        component={ApartmentScreen}
        options={{
          title: 'Apartment',
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
            name="Create QRCode"
            component={CreateHomeQR}
            options={{
              title: 'Create QRCode', //Set Header Title
              headerStyle: {
                backgroundColor: '#ff5722', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="AccessHistory"
            component={AccessHistoryScreen}
            options={{
              title: 'Access History', //Set Header Title
              headerStyle: {
                backgroundColor: '#ff5722', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
    </Stack.Navigator>
  );
}

export default AccessFeatures;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '25%',
    resizeMode: 'contain',
  },
})