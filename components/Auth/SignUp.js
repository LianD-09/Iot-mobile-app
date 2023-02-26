/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
// import {Picker} from '@react-native-picker/picker';
import { authenAPI } from '../../features/authentication/authenAPI';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';

export default function SignUpLayout({ navigation }) {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [citizenId, setCitizenId] = useState('');
  const [isCitizen, setIsCitizen] = useState(true);

  const handleSubmitEvent = (
    name,
    userName,
    password,
    citizenId,
  ) => {
    authenAPI
      .registerAPI({
        fullname: name,
        userName: userName,
        password: password,
        cccd: citizenId,
      })
      .then(response => response)
      .then(responseJson => {
        if (responseJson.data.success === true) {
          Alert.alert('Sign up success');
          navigation.navigate('Sign in', { name: 'Sign in' });
        } else {
          Alert.alert('Sign up failed');
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Sign up failed');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/Login/Logo.png')}
      />
      <ScrollView style={styles.scrollView}>

        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="User name"
            placeholderTextColor="#003f5c"
            onChangeText={userNameInput => setUserName(userNameInput)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#003f5c"
            onChangeText={passwordInput => setPassword(passwordInput)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Full name"
            placeholderTextColor="#003f5c"
            onChangeText={nameInput => setName(nameInput)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Citizen Identification"
            placeholderTextColor="#003f5c"
            onChangeText={citizenIdInput => setCitizenId(citizenIdInput)}
          />
        </View>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() =>
            handleSubmitEvent(
              name,
              userName,
              password,
              citizenId,
            )
          }>
          <Text style={{ color: 'white' }}>Sign up</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    width: '85%',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 40,
  },
  image: {
    height: '20%',
    resizeMode: 'contain',
  },
  inputView: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  textInput: {
    marginLeft: 8,
    width: 250,
    fontSize: 15,
    padding: 10,
  },
  signUpButton: {
    width: 250,
    backgroundColor: '#3A5BB3',
    padding: 10,
    alignItems: 'center',
    alignSelf:'center',
    marginTop: 20,
    marginBottom: 50,
    borderRadius: 10,
  },
});
