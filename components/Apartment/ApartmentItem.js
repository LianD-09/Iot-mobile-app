/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';

const ApartmentItem = ({ title, action }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.item}>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => {
            action(title);
          }}>
          <Text style={styles.name}>{title.apartmentName}</Text>
          <Text>{'   - Code: ' + title.apartmentCode}</Text>
          <Text>{'   - Address: ' + (title?.apartmentAddress ?? "Updating")}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ApartmentItem;

const styles = StyleSheet.create({
  itemContainer: {
    width: Dimensions.get('screen').width * 0.9,
    maxHeight: 120,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    height: '50%',
    resizeMode: 'contain',
  },
  item: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 32,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalBtn: {
    marginTop: 60,
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    paddingVertical: 12,
    paddingHorizontal: 5,
    width: 120,
    backgroundColor: '#3A5BB3',
  },
});
