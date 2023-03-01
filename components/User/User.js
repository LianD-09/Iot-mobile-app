import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { userDataSelector } from '../../features/authentication/userSlice';
import UserInfoItem from './UserInfoItem';
import { userAPI } from '../../features/user/userAPI';

const { width, height } = Dimensions.get('screen');

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
  // const [modalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    let token = userData.token;
    // async function fetchUserInfo() {
    //   const data = await 
    //     userAPI
    //     .getUserAPI({
    //       accountId: userData.accountId
    //     }, token)
    //     .then(response => {
    //       return response.data.data;
    //     })
    //     .catch(error => console.log(error));
    //   setUserInformation({...userData});
    // }
    // fetchUserInfo();
    setUserInformation({ ...userData });
  }, [userData.token]);

  const updateInformation = (data) => {

  }
  return (
    <ScrollView
      style={styles.userInformationContainer}
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          style
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.modalView}>
            <View
              style={{ flexDirection: 'row', position: 'absolute', bottom: 80 }}>
              <TouchableOpacity
                style={[
                  styles.verifyBtn,
                  { backgroundColor: 'red', marginRight: 20 },
                ]}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text style={styles.verifyBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.verifyBtn}
                onPress={() => {
                  setModalVisible(false);
                  updateInformation();
                }}>
                <Text style={styles.verifyBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View> */}
      <Image
        style={styles.image}
        source={require('../../assets/Login/Logo.png')}
      />
      <Text style={styles.userInfoTitle}>User Information</Text>
      {userInformation === null ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.userInformations}>
          <UserInfoItem sytle={styles.userInfoItem}
            labelTitle={'Name: '}
            infoTitle={userInformation.fullName}
            isEdit={isEdit}
          />
          <UserInfoItem
            labelTitle={'User name: '}
            infoTitle={userData.userName}
            isEdit={isEdit}
          />
          <UserInfoItem
            labelTitle={'Citizen identification: '}
            infoTitle={userInformation.cccd}
            isEdit={isEdit}
          />
          <UserInfoItem
            labelTitle={'User id: '}
            infoTitle={userInformation.id}
            isEdit={isEdit}
          />
          <TouchableOpacity
            style={styles.verifyBtn}
            onPress={() => {
              setIsEdit(true)
              // setModalVisible(true);
              // dispatch(
              //   actions.getQrCodeAcceptControl({
              //     timeLife: timelive,
              //     phoneNumber: phoneNumber,
              //   }),
              // );
            }}>
            <Text style={styles.verifyBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  userInformationContainer: {
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,
    position: 'relative',
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
    width: '70%',
  },
  userInfoItem: {
    alignItems: 'center',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'relative',
  },
  modalView: {
    justifyContent: 'center',
    width: (width * 95) / 100,
    height: (height * 70) / 100,
    paddingBottom: 10,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: height / 8,
    // marginBottom: height / 3,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  verifyBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#339FD9',
    width: width / 3,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    // alignContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  verifyBtnText: {
    fontSize: 17,
    fontWeight: '600',
    color: 'white',
    marginRight: 5,
    marginLeft: 5,
  },
});
export default User;
