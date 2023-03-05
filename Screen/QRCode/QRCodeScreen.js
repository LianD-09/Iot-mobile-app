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
  Alert,
  ScrollView,
} from 'react-native';
import { Slider } from 'react-native-elements';
import { ActivityIndicator, Checkbox } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import { useDispatch, useSelector } from 'react-redux';
import Share from 'react-native-share';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import RNFS from 'react-native-fs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { qrcodeAPI } from '../../features/qrcode/qrcodeAPI';
import { apartmentDataSelector } from '../../features/apartment/aparmentSlice';
import { userDataSelector } from '../../features/authentication/userSlice';
import { TextInput } from 'react-native';

const { width, height } = Dimensions.get('screen');

const CreateHomeQR = props => {
  const dispatch = useDispatch();
  const apartment = useSelector(apartmentDataSelector);
  const user = useSelector(userDataSelector);

  const [modalVisible, setModalVisible] = useState(true);
  const [timelive, setTimelive] = useState(60);
  const [count, setCount] = useState(1);
  const [QRImage, setQRImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [qrValue, setQrvalue] = useState('');
  const [accessCount, setAccessCount] = useState(false);
  const [accessTime, setAccessTime] = useState(false);
  const [visitor, setVisitor] = useState('');
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

  const adjustCount = (key) => {
    if (key === '-' && count == 1) {
      return 0;
    }
    setCount(key === '-' ? count - 1 : count + 1);
  }

  const createQR = () => {
    if (!accessCount && !accessTime) {
      Alert.alert('You must select and configure at least one field!');
    }
    else {
      qrcodeAPI
        .createQRCodeAPI({
          apartmentCode: apartment.data.apartmentCode,
          creatorUserId: apartment.userId,
          maxCount: accessCount ? count : 0,
          maxMinute: accessTime ? timelive : 0,
          visitorName: visitor,
        }, user.token)
        .then(res => {
          console.log(res.data)
          setQrvalue(res.data?.data);
          setQRImage(res.data?.data);
          setIsLoading(false);
          setModalVisible(false);
          Alert.alert('Create QR Code successful!')
        })
        .catch(err => {
          console.log(err);
          Alert.alert('Create QR Code failed!')
        })
    }
  }

  useEffect(() => {
    setIsLoading(true);
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
              fontSize: 24,
              color: 'grey',
              marginHorizontal: 20,
              marginVertical: 15,
              fontWeight: 'bold',
            }}>
            Configure QR Code
          </Text>
          <View
            style={{
              marginTop: 15,
              marginStart: 30,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-start',
              height: 40,
            }}>
            <Text style={styles.textModal}>Visitor name:</Text>
            <TextInput
              style={[
                styles.textModal,
                {
                  backgroundColor: null,
                  padding: 0,
                  marginHorizontal: 20,
                  borderBottomWidth: 0.7,
                  width: '60%',
                  textAlign: 'center'
                },
              ]}
              onChangeText={v => {
                setVisitor(v);
              }}
              placeholder='Fill visitor name!'
            />
          </View>
          <View
            style={{
              marginTop: 8,
              marginStart: 30,
              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'flex-start',
            }}>
            <Checkbox
              status={accessCount ? 'checked' : 'unchecked'}
              color="#ff5722"
              onPress={() => {
                setAccessCount(!accessCount);
              }}
            />
            <Text style={styles.textModal}>Limit access:</Text>
          </View>
          {accessCount
            ? <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
              }}
            >
              <TouchableOpacity onPress={() => adjustCount('-')}>
                <Text style={styles.adjustBtn}>-</Text>
              </TouchableOpacity>
              <Text style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                color: '#339FD9',
              }}>{count}</Text>
              <TouchableOpacity onPress={() => adjustCount('+')}>
                <Text style={styles.adjustBtn}>+</Text>
              </TouchableOpacity>
            </View>
            : null}
          <View
            style={{
              marginTop: 8,
              marginStart: 30,
              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'flex-start',
            }}>
            <Checkbox
              status={accessTime ? 'checked' : 'unchecked'}
              color="#ff5722"
              onPress={() => {
                setAccessTime(!accessTime);
              }}
            />
            <Text style={styles.textModal}>Limit time:</Text>
          </View>
          {accessTime
            ? <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: width * 0.85,
                  marginTop: 20,
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
                style={{ width: (width * 8) / 10, height: 30 }}
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
                  marginTop: 5,
                  width: (width * 8) / 10,
                }}>
                {[0, 1, 2, 3, 4, 5, 6, 7].map(item => {
                  return (
                    <View
                      key={item.toString()}
                      style={{
                        height: 6,
                        borderColor: '#3A5BB3',
                        borderWidth: 1,
                      }}
                    />
                  );
                })}
              </View>
              <View style={{ marginTop: 15 }}>
                <Text style={{ fontSize: 16, fontStyle: 'italic' }}>
                  Thời gian tồn tại:{' '}
                  <Text style={{ fontWeight: '500', color: '#339FD9' }}>
                    {timelive} phút
                  </Text>
                </Text>
              </View>
            </View>
            : null}
          <View
            style={{ flexDirection: 'row', position: 'absolute', bottom: 30 }}>
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
                createQR();
                setIsLoading(true);
              }}>
              <Text style={styles.verifyBtnText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Content */}
      {isLoading ? null : (
        <View style={{ marginVertical: 10, flex: 1 }}>
          <View style={{ alignSelf: 'center' }}>
            <Text style={{ fontSize: 17, color: 'black' }}>
              Create QRCode succesful
            </Text>
            <Text style={{ fontSize: 17, color: 'black' }}>
              QRCode is availabled for:{' '}
              <Text style={{ color: '#339FD9' }}>{accessTime ? `${timelive} minutes` : `Unlimited`}</Text>
            </Text>
          </View>
          <View style={{ alignSelf: 'center', marginVertical: 10 }}>
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
        </View>
      )}
      <View style={{ marginTop: 5 }}>
        <TouchableOpacity
          style={
            Platform.OS === 'ios'
              ? [styles.verifyBtn, { width: (width * 2) / 3 + 20 }]
              : [styles.verifyBtn, { width: width * 2 / 3 + 20 }]
          }
          onPress={() => {
            setModalVisible(true);
          }}>
          <Ionicons name="create-outline" size={25} color="white" />
          <Text style={styles.verifyBtnText}>Create QRCode</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default CreateHomeQR;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  centeredView: {
    width: (width * 95) / 100,
    height: (height * 70) / 100,
    paddingBottom: 10,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: height / 10,
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
    marginTop: 10,
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
  adjustBtn: {
    marginHorizontal: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#339FD9',
    borderColor: '#339FD9',
    borderWidth: 0.7,
    borderRadius: 15,
    width: 30,
    height: 30,
  },
  textModal: {
    marginTop: 8,
    fontSize: 14,
    color: 'grey'
  }
});