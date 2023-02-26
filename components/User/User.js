import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Text, View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { userDataSelector } from '../../features/authentication/userSlice';
import UserInfoItem from './UserInfoItem';

const mock_user = {
  name: 'Linh',
  surname: 'Do',
  userName: 'linhda',
  emailAddress: 'abc@gmail.com',
  id: 1234,
}

const User = () => {
  const userData = useSelector(userDataSelector);
  const [userInformation, setUserInformation] = useState([]);

  useEffect(() => {
    // const url =
    //   'http://103.229.41.59/api/services/app/Session/GetCurrentLoginInformations';
    // let config = {
    //   headers: {Authorization: `Bearer ${userData.accessToken}`},
    //   params: null,
    // };
    // async function fetchUserInfo() {
    //   const data = await axios
    //     .get(url, config)
    //     .then(function (response) {
    //       console.log(JSON.parse(response.request._response).result.user);
    //       return JSON.parse(response.request._response).result.user;
    //     })
    //     .catch(error => console.log(error));
    //   setUserInformation(data);
    // }
    // fetchUserInfo();
    setUserInformation(mock_user);
  }, [userData.accessToken]);
  return (
    <View style={styles.notificationContainer}>
      <Image
        style={styles.image}
        source={require('../../assets/Login/Logo.png')}
      />
      <Text style={styles.userInfoTitle}>User Information</Text>
      {userInformation === null ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.userInformations}>
          <UserInfoItem
            labelTitle={'Name: '}
            infoTitle={userInformation.name}
          />
          <UserInfoItem
            labelTitle={'Surname: '}
            infoTitle={userInformation.surname}
          />
          <UserInfoItem
            labelTitle={'User name: '}
            infoTitle={userInformation.userName}
          />
          <UserInfoItem
            labelTitle={'Email address: '}
            infoTitle={userInformation.emailAddress}
          />
          <UserInfoItem
            labelTitle={'User id: '}
            infoTitle={userInformation.id}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    height: '30%',
    resizeMode: 'contain',
  },
  userInfoTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  userInformations: {
    marginTop: 20,
  },
});
export default User;
