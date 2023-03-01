import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const UserInfoItem = ({ labelTitle, infoTitle, isEdit }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.labelTitle}>{labelTitle}</Text>
      {!isEdit ?
        <Text style={styles.infoTitle}>{infoTitle}</Text>
        :
        <TextInput
          style={styles.infoTitle}
          underlineColor="transparent"
        >
          {infoTitle}
        </TextInput>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.7,
    marginTop: 7,
    paddingVertical: 5,
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
    marginBottom: 0,
    backgroundColor: null,
    fontSize: 14,
    marginVertical: 8,
    color: '#242A53',
  },
});

export default UserInfoItem;
