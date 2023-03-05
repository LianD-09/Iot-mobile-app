/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image, StyleSheet} from 'react-native';
import UserScreen from '../../Screen/UserScreen/UserScreen';
// import {SmartSocialScreen} from '../../Screen/smartSocialScreen/SmartSocialScreen';
// import CreateHomeQR from '../../Screen/smartSocialScreen/QRCodeScreen';
import AssignApartment from '../../Screen/AssignApartment/AssignApartment';
import AccessFeatures from '../../Screen/AccessFeatures/AccessFeatures';
import AntDesign from 'react-native-vector-icons/AntDesign'

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
        component={AccessFeatures}
        options={{
          showLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={[styles.tabContainer, {flex : 1}]}>
              {/* <Image
                source={require('../../assets/Home/History.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#3A5BB3' : '#a9a9a9',
                }}
              /> */}
              <AntDesign size={30} name="appstore1" color={focused ? '#ff5722' : '#a9a9a9'}/>
              <Text
                style={{color: focused ? '#ff5722' : '#a9a9a9', fontSize: 12}}>
                Access Features
              </Text>
            </View>
          ),
          title: 'Access History', //Set Header Title
          headerStyle: {
            backgroundColor: '#ff5722', //Set Header color
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
                  tintColor: focused ? '#ff5722' : '#a9a9a9',
                }}
              />
              <Text
                style={{color: focused ? '#ff5722' : '#a9a9a9', fontSize: 12}}>
                Assign Apartment
              </Text>
            </View>
          ),
          title: 'Assign Apartment', //Set Header Title
          headerStyle: {
            backgroundColor: '#ff5722', //Set Header color
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
                  tintColor: focused ? '#ff5722' : '#a9a9a9',
                }}
              />
              <Text
                style={{color: focused ? '#ff5722' : '#a9a9a9', fontSize: 12}}>
                User
              </Text>
            </View>
          ),
          title: 'User', //Set Header Title
          headerStyle: {
            backgroundColor: '#ff5722', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {alignItems: 'center', justifyContent: 'center', top: 0},
  tabImage: {},
});
