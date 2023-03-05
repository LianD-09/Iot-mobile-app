/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Alert,
  ScrollView,
} from 'react-native';
import { Slider } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import { useDispatch, useSelector } from 'react-redux';
import Share from 'react-native-share';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import RNFS from 'react-native-fs';

import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('screen');

const CreateHomeQR = props => {
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [timelive, setTimelive] = useState(60);
  const [QRImage, setQRImage] = useState('abc');
  const [isLoading, setIsLoading] = useState(false);
  const [qrValue, setQrvalue] = useState('abc');
  const setTimeLive = time => {
    setTimelive(time);
  };

  const saveQRImageToGalley = async () => {
    // if (Platform.OS === 'android') {
    //   var isReadGranted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //   );
    // }
    // if (
    //   isReadGranted === PermissionsAndroid.RESULTS.GRANTED &&
    //   Platform.OS === 'android'
    // ) {
    //   //const dirs = RNFetchBlob.fs.dirs;
    //   this.svg.toDataURL(data => {
    //     RNFS.writeFile(
    //       RNFS.CachesDirectoryPath + '/doji-qrcode.png',
    //       data,
    //       'base64',
    //     )
    //       .then(success => {
    //         Alert.alert('Đã lưu QR code vào thư viện thành công!');
    //         return CameraRoll.save(
    //           RNFS.CachesDirectoryPath + '/doji-qrcode.png',
    //           'photo',
    //         );
    //       })
    //       .catch(err => {
    //         console.log('Lưu ảnh QR code lỗi: ', err);
    //       });
    //   });
    // }
    // if (Platform.OS === 'ios') {
    //   this.svg.toDataURL(data => {
    //     RNFS.writeFile(
    //       RNFS.CachesDirectoryPath + '/doji-qrcode.png',
    //       data,
    //       'base64',
    //     )
    //       .then(success => {
    //         Alert.alert('Đã lưu QR code vào thư viện thành công!');
    //         return CameraRoll.save(
    //           RNFS.CachesDirectoryPath + '/doji-qrcode.png',
    //           'photo',
    //         );
    //       })
    //       .catch(err => {
    //         console.log('Lưu ảnh QR code lỗi: ', err);
    //       });
    //   });
    // }
  };

  // if (Platform.OS === 'ios') {
  //   const options = {
  //     title: 'Share is your QRcode',
  //     url: QRImage,
  //     type: 'image/jpg',
  //   };
  //   try {
  //     console.log(options);
  //     await Share.open(options);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const handleShare = async () => {
    const options = {
      title: 'Share is your QRcode',
      url: QRImage,
      // type: 'image/jpg',
    };
    try {
      await Share.open(options);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setQrvalue('doanhlinh12');
    setQRImage('data:image/png;base64,' + 'doanhlinh12');
    setIsLoading(false);
  }, []);
  return (
      <ScrollView
        style={{
          height: height,
          backgroundColor: modalVisible ? '#dcdcdc' : 'rgba(255, 255, 255, 0.5)',
        }}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                position: 'absolute',
                top: 50,
                marginHorizontal: 20,
                fontWeight: '600',
              }}>
              Thiết lập tạo QR Code
            </Text>
            <View style={{ position: 'absolute', top: 100 }}>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    marginTop: 0,
                    color: 'white',
                    fontStyle: 'italic',
                  }}>
                  {'12345'}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: (width * 9) / 10,
                marginTop: 0,
              }}>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 14,
                  fontWeight: '600',
                  fontStyle: 'italic',
                }}>
                15 phút
              </Text>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 14,
                  fontWeight: '600',
                  fontStyle: 'italic',
                }}>
                120 phút
              </Text>
            </View>
            <Slider
              style={{ width: (width * 8) / 10, height: 40 }}
              minimumValue={15}
              maximumValue={120}
              step={15}
              value={timelive}
              minimumTrackTintColor="#40afff"
              maximumTrackTintColor="#c2e7ff"
              thumbStyle={{ height: 20, width: 20, backgroundColor: '#339FD9' }}
              thumbTintColor="#339FD9"
              onSlidingComplete={value => setTimeLive(value)}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 12,
                width: (width * 8) / 10,
              }}>
              {[0, 1, 2, 3, 4, 5, 6, 7].map(item => {
                return (
                  <View
                    key={item.toString()}
                    style={{
                      height: 6,
                      borderColor: 're',
                      borderWidth: 1,
                    }}
                  />
                );
              })}
            </View>
            <View style={{ marginTop: 50 }}>
              <Text style={{ fontSize: 16, fontStyle: 'italic' }}>
                Thời gian tồn tại:{' '}
                <Text style={{ fontWeight: '500', color: '#339FD9' }}>
                  {timelive} phút
                </Text>
              </Text>
            </View>
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
                <Text style={styles.verifyBtnText}>Huỷ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.verifyBtn}
                onPress={() => {
                  setIsLoading(true);
                  setModalVisible(false);
                  // dispatch(
                  //   actions.getQrCodeAcceptControl({
                  //     timeLife: timelive,
                  //     phoneNumber: phoneNumber,
                  //   }),
                  // );
                }}>
                <Text style={styles.verifyBtnText}>Tạo mã QR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Content */}
        {isLoading ? null : (
          <View style={{ marginVertical: 20, flex: 1 }}>
            <View style={{ alignSelf: 'center' }}>
              <Text style={{ fontSize: 17, color: 'black' }}>
                Tạo mã QR thành công
              </Text>
              <Text style={{ fontSize: 17, color: 'black' }}>
                Mã QR có hiệu lực trong:{' '}
                <Text style={{ color: '#339FD9' }}>{timelive} phút</Text>
              </Text>
            </View>
            <View style={{ alignSelf: 'center', marginTop: 10 }}>
              <QRCode
                value={qrValue ? qrValue : 'fgyhdtfghf'}
                //   getRef={c => (this.svg = c)}
                size={(width * 4) / 5}
                quietZone={width / 9}
              />
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              {Platform.OS === 'android' ? (
                <View style={{ marginTop: 5, marginEnd: 20 }}>
                  <TouchableOpacity
                    style={
                      Platform.OS === 'ios'
                        ? [styles.verifyBtn, { width: (width * 2) / 3 + 20 }]
                        : [styles.verifyBtn]
                    }
                    onPress={() => {
                      // setModalVisible(false);
                      // props.navigation.goBack();
                      handleShare();
                    }}>
                    <Ionicons name="share-outline" size={25} color="white" />
                    <Text style={styles.verifyBtnText}>Share</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              <View style={{ marginTop: 5 }}>
                <TouchableOpacity
                  style={
                    Platform.OS === 'ios'
                      ? [styles.verifyBtn, { width: (width * 2) / 3 + 20 }]
                      : [styles.verifyBtn]
                  }
                  onPress={() => {
                    saveQRImageToGalley();
                  }}>
                  <Ionicons name="download-outline" size={25} color="white" />
                  <Text style={styles.verifyBtnText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: 5 }}>
              <TouchableOpacity
                style={
                  Platform.OS === 'ios'
                    ? [styles.verifyBtn, { width: (width * 2) / 3 + 20 }]
                    : [styles.verifyBtn, { width: width * 2 / 3 + 20 }]
                }
                onPress={() => {
                  // props.navigation.goBack();
                  setModalVisible(true);
                }}>
                <Ionicons name="create-outline" size={25} color="white" />
                <Text style={styles.verifyBtnText}>Tạo QR</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
  );
};
export default CreateHomeQR;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  centeredView: {
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
  qrImage: {
    alignSelf: 'center',
    width: (width * 3) / 4,
    height: (width * 3) / 4,
  },
  textInput: {
    width: (width * 80) / 100,
    backgroundColor: '#F1F1F1',
    marginVertical: 7,
    borderRadius: 10,
  },
  textInputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: height / 8,
  },
  textInTextInput: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: width / 20,
  },
});