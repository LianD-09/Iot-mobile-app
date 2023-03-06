/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Dimensions, Alert, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import {
    StyleSheet,
    Text,
    Pressable,
    ScrollView,
    View,
} from 'react-native';
import { apartmentAPI } from '../../features/apartment/apartmentAPI';
import { userDataSelector } from '../../features/authentication/userSlice';
import Icon from 'react-native-vector-icons/AntDesign';
import { assignAPI } from '../../features/assign/assignAPI';

const CreateForm = ({ route, navigation }) => {
    const listFormCode = route.params?.listForm.map(item => {
        return { apartmentCode: item.apartmentCode, state: item.state }
    });
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector(userDataSelector);
    const [list, setList] = useState([]);
    const [code, setCode] = useState('');
    const [select, setSelect] = useState(false);

    useEffect(() => {
        apartmentAPI
            .getAllAPI()
            .then(res => {
                const listAparment = res.data?.data.map(item => item.apartmentCode);
                setList(listAparment);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            })
    }, [])

    const assignForm = () => {
        if (code == '') {
            setCode('');
            return Alert.alert('Select apartment before assign!');
        }
        if (listFormCode.findIndex(ele => (ele.apartmentCode == code) && (ele.state !== 3)) !== -1) {
            setCode('');
            return Alert.alert('You have been assign this apartment before!');
        }
        setIsLoading(true)
        assignAPI
            .createFormAPI({
                id: 0,
                fullName: user.fullName,
                apartmentCode: code,
                cccd: user.cccd,
                userId: user.id,
                state: 0,
                creationTime: new Date(),
                userImageUrl: "",
            }, user.token)
            .then(res => {
                setIsLoading(false);
                const success = res.data.success;
                if (success) {
                    Alert.alert("Create form successful!");
                    navigation.navigate('ListForm');
                    route.params?.createFormFromModel();
                }
                else {
                    Alert.alert("Create form failed!");
                }
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
                Alert.alert("Create form failed!");
            })
    }

    return (
        !isLoading
            ? <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../../assets/Login/Logo.png')}
                />
                <Text style={styles.title}>Assign an apartment</Text>

                <ScrollView style={{
                    maxHeight: Dimensions.get('screen').height * 0.8,
                    maxWidth: Dimensions.get('screen').width * 0.9,
                }}>
                    <View style={styles.textFormContainer}>
                        <Text style={styles.labelTitle}>Name:</Text>
                        <Text style={styles.infoTitle}>
                            {user?.fullName}
                        </Text>
                    </View>
                    <View style={styles.textFormContainer}>
                        <Text style={styles.labelTitle}>Citizen ID:</Text>
                        <Text style={styles.infoTitle}>
                            {user?.cccd}
                        </Text>
                    </View>
                    <View style={styles.textFormContainer}>
                        <Text style={styles.labelTitle}>Apartment Code:</Text>
                        <SelectDropdown
                            data={list}
                            buttonStyle={{
                                flex: 1,
                                padding: 0,
                                margin: 0,
                                backgroundColor: null,
                            }}
                            buttonTextStyle={[styles.infoTitle, { textAlign: 'left', paddingLeft: 0, fontWeight: 'bold' }]}
                            rowTextStyle={[styles.infoTitle, { paddingLeft: 0 }]}
                            dropdownStyle={{ borderRadius: 10 }}
                            selectedRowStyle={{ backgroundColor: '#339FD9' }}
                            selectedRowTextStyle={{ color: 'white' }}
                            dropdownIconPosition={'right'}
                            renderDropdownIcon={() => !select ? <Icon name='caretdown' size={12} /> : <Icon name='caretup' size={12} />}
                            defaultButtonText="Select Apartment"
                            defaultValue={code}
                            onSelect={(item) => {
                                setCode(item);
                            }}
                            onFocus={() => setSelect(true)}
                            onBlur={() => setSelect(false)}
                        />
                    </View>
                    <View
                        style={{
                            width: 300,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                        }}>
                        <Pressable
                            style={[styles.formBtn, { backgroundColor: 'red' }]}
                            onPress={() => {
                                navigation.goBack();
                                route.params?.createFormFromModel();
                            }}>
                            <Text style={styles.textStyle}>Back</Text>
                        </Pressable>
                        <Pressable
                            style={styles.formBtn}
                            onPress={() => assignForm()}>
                            <Text style={styles.textStyle}>Assgin</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
            : <ActivityIndicator size="large" style={styles.loading} />
    );
};

export default CreateForm;

const styles = StyleSheet.create({
    loading: {
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'column',
        paddingVertical: 20,
    },
    image: {
        height: '25%',
        resizeMode: 'contain',
    },
    item: {
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 10,
    },
    title: {
        marginVertical: 20,
        fontSize: 25,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    formBtn: {
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
        alignItems: 'center'
    },
    labelTitle: {
        fontWeight: '900',
        fontSize: 14,
        marginVertical: 8,
        color: '#6D1D3A',
        width: '45%',
    },
    infoTitle: {
        marginVertical: 8,
        paddingLeft: 15,
        backgroundColor: null,
        fontSize: 14,
        color: '#242A53',
    },
});
