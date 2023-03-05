/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import guestImg from './dal.jpg';

const NotificationItem = ({ title }) => {
  const [showEvent, setShowEvent] = useState(false);
  const time = format(new Date(title.creationTime), 'HH:mm:ss - dd/MM/yyyy');

  return (
    <View style={styles.itemContainer}>
      {/* <Text>{title.countComment}</Text> */}
      <View style={styles.item}>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setShowEvent(true)}>
          <Text style={styles.name}>{'- ' + title.mqttType}</Text>
          <Text>{'   - Name: ' + title.visitorName}</Text>
          <Text>{'   - Time: ' + time}</Text>
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showEvent}
        onRequestClose={() => {
          setShowEvent(!showEvent);
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
              <Text style={styles.name}>{'Action: ' + title.mqttType}</Text>
              <Text>{'- Name: ' + title.visitorName}</Text>
              <Text>{'- Content: ' + title.description}</Text>
              <Text style={styles.modalText}>{'- Time: ' + time}</Text>
            </ScrollView>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {title.imageUrl 
              ? <Image style={styles.image} source={title.imageUrl} />
              : <Icon name="user" size={200} style={{marginTop: 20}}/>}
              <Pressable
                style={styles.hideDetailBtn}
                onPress={() => setShowEvent(!showEvent)}>
                <Text style={styles.textStyle}>Hide details</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default NotificationItem;
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
    marginTop: 30,
    height: 200,
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
  buttonClose: {
    backgroundColor: '#3A5BB3',
    marginTop: 10,
    paddingVertical: 10,
    width: 150,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  hideDetailBtn: {
    marginTop: 30,
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    paddingVertical: 12,
    paddingHorizontal: 5,
    width: 120,
    backgroundColor: '#3A5BB3',
  },
});
