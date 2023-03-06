import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userDataSelector } from '../../../features/authentication/userSlice';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import RenderNotificationItem from './NotificationList';
import { apartmentDataSelector } from '../../../features/apartment/aparmentSlice';
import { accessHistoryAPI } from '../../../features/accessHistory/accessHistory';

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

const Notification = () => {
  const user = useSelector(userDataSelector);
  const apartment = useSelector(apartmentDataSelector);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    accessHistoryAPI
      .getAccessHistoryAPI({
        apartmentCode: apartment.data?.apartmentCode,
      }, user.token)
      .then(res => {
        setNotifications(res.data?.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false);
      })
    // setTimeout(() => { }, 500);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {!isLoading ? (
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
