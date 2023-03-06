import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import {
    SafeAreaView,
    FlatList,
    Text,
    StyleSheet,
    Modal,
    ScrollView,
    Pressable,
    View,
    Alert,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { userDataSelector } from '../../features/authentication/userSlice';
import FormItem from './FormItem';
import { assignAPI } from '../../features/assign/assignAPI';
import { formState } from './formState';
import { Dimensions } from 'react-native';

const ListForm = () => {
    const navigation = useNavigation();
    const [list, setList] = useState([]);
    const user = useSelector(userDataSelector);
    const [showItem, setShowItem] = useState(false);
    const [form, setForm] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        assignAPI
            .getUserFormsAPI({
                userId: user.id,
            }, user.token)
            .then(res => {
                setList(res.data.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err)
            })
    }, [user])

    const showForm = (data) => {
        setForm(data);
        setShowItem(true);
    }

    return (
        !isLoading ?
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>List of Form</Text>
                <FlatList
                    data={list}
                    renderItem={({ item }) => <FormItem title={item} action={showForm} />}
                    keyExtractor={item => item.id}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        marginBottom: 20,
                    }}>
                    <Pressable
                        style={{
                            marginTop: 30,
                            borderRadius: 10,
                            padding: 20,
                            elevation: 2,
                            paddingVertical: 12,
                            paddingHorizontal: 5,
                            width: Dimensions.get('screen').width * 0.6,
                            backgroundColor: '#339FD9',
                        }}
                        onPress={() => {
                            navigation.navigate('CreateForm', { listForm: list })
                        }}>
                        <Text style={styles.textStyle}>Assign New Apartment</Text>
                    </Pressable>
                </View>
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
                                    color: 'grey',
                                    fontSize: 25,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    marginBottom: 20,
                                }}>
                                Form Information
                            </Text>
                            <ScrollView style={{ maxHeight: Dimensions.get('screen').height * 0.7 }}>
                                <Text style={styles.name}>{form?.apartmentCode}</Text>
                                <View style={styles.textFormContainer}>
                                    <Text style={styles.labelTitle}>Name:</Text>
                                    <Text style={styles.infoTitle}>
                                        {form?.fullName}
                                    </Text>
                                </View>
                                <View style={styles.textFormContainer}>
                                    <Text style={styles.labelTitle}>User ID:</Text>
                                    <Text style={styles.infoTitle}>
                                        {form?.userId}
                                    </Text>
                                </View>
                                <View style={styles.textFormContainer}>
                                    <Text style={styles.labelTitle}>Citizen ID:</Text>
                                    <Text style={styles.infoTitle}>
                                        {form?.cccd}
                                    </Text>
                                </View>
                                <View style={styles.textFormContainer}>
                                    <Text style={styles.labelTitle}>Creation Time:</Text>
                                    <Text style={styles.infoTitle}>
                                        {form?.creationTime
                                            ? format(new Date(form?.creationTime), 'HH:mm:ss - dd/MM/yyyy')
                                            : 'Updating'}
                                    </Text>
                                </View>
                                <View style={styles.textFormContainer}>
                                    <Text style={styles.labelTitle}>State:</Text>
                                    <Text style={styles.infoTitle}>
                                        {formState[form?.state] ?? null}
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
                                    style={styles.modalBtn}
                                    onPress={() => setShowItem(!showItem)}>
                                    <Text style={styles.textStyle}>Hide Detail</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
            :
            <ActivityIndicator size="large" style={styles.loading} />
    );
}

export default ListForm;

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
        width: '45%',
    },
    infoTitle: {
        marginVertical: 8,
        padding: 0,
        backgroundColor: null,
        fontSize: 14,
        color: '#242A53',
    },
})