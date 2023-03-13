import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const UserInfoItem = ({ labelTitle, setInformation, infoTitle, isEdit }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.labelTitle}>{labelTitle}</Text>
      <TextInput
        style={styles.infoTitle}
        underineColor="transparent"
        onChangeText={v => {
          setInformation(v);
        }}
        value={`${infoTitle}`}
        disabled={!isEdit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.7,
    marginTop: 7,
    height: 50,
    alignItems: 'center'
  },
  labelTitle: {
    fontWeight: '900',
    fontSize: 14,
    marginVertical: 8,
    color: '#6D1D3A',
    width: '55%',
  },
  infoTitle: {
    marginVertical: 8,
    padding: 0,
    backgroundColor: null,
    fontSize: 14,
    color: '#242A53',
  },
});

export default UserInfoItem;
