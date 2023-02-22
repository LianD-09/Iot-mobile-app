import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {userDataSelector} from '../../../features/authentication/userSlice';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import RenderNotificationItem from './NotificationList';

const Notification = () => {
  const userData = useSelector(userDataSelector);
  const [notifications, setNotifications] = useState([]);
  const data = [
    {
      id: 0,
      Name: 'Guest',
      Type: 'Door open',
      Time: '20-09-2022, 6:56 PM',
      Message: 'Access by your permission',
    },
    {
      id: 1,
      Name: 'Guest',
      Type: 'Incoming Call',
      Time: '20-09-2022, 6:55 PM',
      Message: 'Someone is calling you',
    },
    {
      id: 2,
      Name: 'Anh Toan IMAX',
      Type: 'Door open',
      Time: '20-09-2022, 6:56 PM',
      Message: 'Access by your QRCode',
    },
    {
      id: 3,
      Name: 'Do Anh Linh',
      Type: 'Door open',
      Time: '20-09-2022, 6:56 PM',
      Message: 'Access by your QRCode',
    },
    {
      id: 4,
      Name: 'You',
      Type: 'Door open',
      Time: '20-09-2022, 6:57 PM',
      Message: 'Access by your permission',
    },
  ];
  useEffect(() => {
    // const url =
    //   'http://103.229.41.59/api/services/app/UserCityNotification/GetAllNotificationUserTenant';
    // let config = {
    //   headers: {Authorization: `Bearer ${userData.accessToken}`},
    //   params: {
    //     Type: 1,
    //   },
    // };
    // async function fetchEvents() {
    //   const data = await axios
    //     .get(url, config)
    //     .then(response => response.request._response)
    //     .then(responseRequestResponse => {
    //       console.log(JSON.parse(responseRequestResponse).result.data);
    //       return JSON.parse(responseRequestResponse).result.data;
    //     })
    //     .catch(error => console.log(error));
    //   setNotifications(data);
    // }
    // fetchEvents();
    setTimeout(() => {}, 500);
    setNotifications(data);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {notifications.length ? (
        <FlatList
          data={notifications}
          renderItem={RenderNotificationItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <ActivityIndicator size="large" />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Notification;
