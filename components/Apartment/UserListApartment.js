import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { userDataSelector } from '../../features/authentication/userSlice';
import ApartmentItem from './ApartmentItem';
import { userApartmentAPI } from '../../features/apartment/userApartmentAPI';
import { setApartment } from '../../features/apartment/aparmentSlice';

const UserListApartment = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(userDataSelector);

  useEffect(() => {
    userApartmentAPI
      .getUserAparmentAPI({ userId: user.id }, user.token)
      .then(res => {
        setList(res.data.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, [user?.token]);

  const displayApartment = data => {
    navigation.navigate('Apartment');
    dispatch(setApartment(data));
  };
  return (
    <View style={styles.container}>
      {/* <TabTitle title={'alsfjl'} {...props} /> */}
      <Text style={styles.title}>My Apartments</Text>
      {!isLoading ? (
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <ApartmentItem title={item} action={displayApartment} />
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        <ActivityIndicator size="large" style={styles.loading} />
      )}
    </View>
  );
};

export default UserListApartment;

const styles = StyleSheet.create({
  loading: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginVertical: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: '#6D1D3A',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,
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
    marginTop: 30,
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    paddingVertical: 12,
    paddingHorizontal: 5,
    width: 120,
    backgroundColor: '#3A5BB3',
  },
  textFormContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.7,
    borderBottomColor: 'grey',
    marginTop: 7,
    height: 50,
    alignItems: 'center',
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
