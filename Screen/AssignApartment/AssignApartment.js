import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ListApartment from '../../components/AssignApartment/ListApartment';

const AssignApartment = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container} >
      <ListApartment />
    </SafeAreaView>
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