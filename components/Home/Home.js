/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image, StyleSheet} from 'react-native';
import AccessHistoryScreen from '../userAccessNotification/AccessHistoryScreen';
import UserScreen from '../UserScreen/UserScreen';
// import {SmartSocialScreen} from '../../Screen/smartSocialScreen/SmartSocialScreen';
// import CreateHomeQR from '../../Screen/smartSocialScreen/QRCodeScreen';
import AssignApartment from '../../Screen/AssignApartment/AssignApartment';

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Access History"
        component={AccessHistoryScreen}
        options={{
          showLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={[styles.tabContainer, {flex : 1}]}>
              <Image
                source={require('../../assets/Home/History.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#3A5BB3' : '#a9a9a9',
                }}
              />
              <Text
                style={{color: focused ? '#3A5BB3' : '#a9a9a9', fontSize: 12}}>
                Access History
              </Text>
            </View>
          ),
          title: 'Access History', //Set Header Title
          headerStyle: {
            backgroundColor: '#3A5BB3', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Tab.Screen
        name="Assign Apartment"
        component={AssignApartment}
        options={{
          showLabel: false,
          headerShown: false,
          // tabBarStyle: {display: 'none'},
          tabBarIcon: ({focused}) => (
            <View style={[styles.tabContainer, {flex : 1}]}>
              <Image
                source={require('../../assets/Home/QRCode.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#3A5BB3' : '#a9a9a9',
                }}
              />
              <Text
                style={{color: focused ? '#3A5BB3' : '#a9a9a9', fontSize: 12}}>
                Assign Apartment
              </Text>
            </View>
          ),
          title: 'Create QRCode', //Set Header Title
          headerStyle: {
            backgroundColor: '#3A5BB3', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          showLabel: false,
          headerShown: false,
          // tabBarStyle: {display: 'none'},
          tabBarIcon: ({focused}) => (
            <View style={[styles.tabContainer, {flex : 1}]}>
              <Image
                source={require('../../assets/Home/User.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#3A5BB3' : '#a9a9a9',
                }}
              />
              <Text
                style={{color: focused ? '#3A5BB3' : '#a9a9a9', fontSize: 12}}>
                User
              </Text>
            </View>
          ),
          title: 'User', //Set Header Title
          headerStyle: {
            backgroundColor: '#3A5BB3', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {alignItems: 'center', justifyContent: 'center', top: 0},
  tabImage: {},
});
