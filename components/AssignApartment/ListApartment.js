import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
    SafeAreaView,
    FlatList,
    Text,
    StyleSheet,
    Modal,
    ScrollView,
    Pressable,
    View,
    TextInput,
    Alert,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { apartmentAPI } from '../../features/apartment/apartmentAPI';
import { userDataSelector } from '../../features/authentication/userSlice';
import ApartmentItem from './ApartmentItem';
import { assignAPI } from '../../features/assign/assignAPI';

const ListApartment = () => {
    const navigation = useNavigation();
    const [list, setList] = useState([]);
    const user = useSelector(userDataSelector);
    const [showItem, setShowItem] = useState(false);
    const [apartment, setApartment] = useState({})

    useEffect(() => {
        apartmentAPI
            .getAllAPI()
            .then(res => {
                setList([...res.data.data])
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const showForm = (data) => {
        setApartment(data);
        setShowItem(true);
    }

    const assignForm = (data) => {
        setShowItem(!showItem)
        assignAPI
            .createFormAPI({
                id: 0,
                fullName: data.fullName,
                apartmentCode: data.apartmentCode,
                cccd: data.cccd,
                userId: data.id,
                state: 0,
                creationTime: data.creationTime,
                userImageUrl: "",
            }, data.token)
            .then(res => {
                const success = res.data.success;
                const loginData = res.data.data;
                if (success) {
                    Alert.alert("Create form successful!");
                    navigation.navigate('Access History', { name: 'Access History' });
                }
                else {
                    Alert.alert("Create form failed!");
                }
            })
            .catch(err => {
                console.log(err);
                Alert.alert("Create form failed!");
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>List of Apartments</Text>
            {list.length ? (
                <FlatList
                    data={list}
                    renderItem={({ item }) => <ApartmentItem title={item} action={showForm} />}
                    keyExtractor={item => item.id}
                />
            ) : (
                <ActivityIndicator size="large" style={styles.loading} />
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showItem}
                onRequestClose={() => {
                    setShowItem(!showItem);
                }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text
                            style={{
                                ...styles.modalText,
                                color: '#242A53',
                                fontSize: 25,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                marginBottom: 20,
                            }}>
                            Assign Apartment
                        </Text>
                        <ScrollView style={{ maxHeight: 500 }}>
                            <Text style={styles.name}>{apartment.apartmentName}</Text>
                            <View style={styles.textFormContainer}>
                                <Text style={styles.labelTitle}>Apartment Code:</Text>
                                <Text style={styles.infoTitle}>
                                    {apartment.apartmentCode}
                                </Text>
                            </View>
                            <View style={styles.textFormContainer}>
                                <Text style={styles.labelTitle}>Address:</Text>
                                <Text style={styles.infoTitle}>
                                    {apartment.address}
                                </Text>
                            </View>
                            <View style={styles.textFormContainer}>
                                <Text style={styles.labelTitle}>Username:</Text>
                                <Text style={styles.infoTitle}>
                                    {user.userName}
                                </Text>
                            </View>
                        </ScrollView>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                            }}>
                            <Pressable
                                style={[styles.modalBtn, { backgroundColor: 'red' }]}
                                onPress={() => setShowItem(!showItem)}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={styles.modalBtn}
                                onPress={() => assignForm({ ...apartment, ...user })}>
                                <Text style={styles.textStyle}>Assgin</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

export default ListApartment;

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
        alignItems: 'center'
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
})