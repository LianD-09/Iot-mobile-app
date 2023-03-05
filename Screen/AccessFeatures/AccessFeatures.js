import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ApartmentScreen from '../../components/Apartment/ApartmentScreen';
import UserListApartment from '../../components/Apartment/UserListApartment';
import { apartmentDataSelector } from '../../features/apartment/aparmentSlice';

const AccessFeatures = ({ navigation }) => {
  const apartment = useSelector(apartmentDataSelector);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setFlag(apartment.isChoosen);
  }, [apartment])

  return (
    <SafeAreaView style={styles.container} >
      {!flag ?
        <UserListApartment /> : 
        <ApartmentScreen />
      }
    </SafeAreaView>
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