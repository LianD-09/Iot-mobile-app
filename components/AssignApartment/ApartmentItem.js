/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';

const ApartmentItem = ({ title, showForm }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.item}>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => {
            showForm(title);
          }}>
          <Text style={styles.name}>{title.apartmentName}</Text>
          <Text>{'   - Code: ' + title.apartmentCode}</Text>
          <Text>{'   - Address: ' + title.address}</Text>
        </Pressable>
      </View>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={showItem}
        onRequestClose={() => {
          setShowItem(!showItem);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text
              style={{
                ...styles.modalText,
                color: '#242A53',
                fontSize: 17,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Detail:
            </Text>
            <ScrollView style={{ maxHeight: 500 }}>
              <Text style={styles.name}>{'- Action: ' + title.Type}</Text>
              <Text>{'- Name: ' + title.Name}</Text>
              <Text>{'- Content: ' + title.Message}</Text>
              <Text style={styles.modalText}>{'- Time: ' + title.Time}</Text>
            </ScrollView>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <Pressable
                style={[styles.modalBtn, {backgroundColor: 'red'}]}
                onPress={() => setShowItem(!showItem)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={styles.modalBtn}
                onPress={() => setShowItem(!showItem)}>
                <Text style={styles.textStyle}>Accept</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

export default ApartmentItem;

const styles = StyleSheet.create({
  itemContainer: {
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
