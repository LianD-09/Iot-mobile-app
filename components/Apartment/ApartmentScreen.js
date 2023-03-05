import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { apartmentDataSelector } from '../../features/apartment/aparmentSlice';
import ApartmentFeatures from './ApartmentFeatures';

const { height, width } = Dimensions.get('screen');

const ApartmentScreen = ({ navigation }) => {
    const apartment = useSelector(apartmentDataSelector)
    const data = apartment.data;
    const [history, setHistory] = useState(false);
    const [qrcode, setQrcode] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../assets/Login/Logo.png')}
            />
            <Text style={styles.title}>{data.apartmentName}</Text>
            <View style={styles.desContainer}>
                <Text style={styles.textTitle}>Apartment Code:</Text>
                <Text style={styles.textDes}>{data.apartmentCode}</Text>
            </View>
            <View style={styles.desContainer}>
                <Text style={styles.textTitle}>Address:</Text>
                <Text style={styles.textDes}>{data.apartmentAddress}</Text>
            </View>
            <ApartmentFeatures />
        </SafeAreaView>
    );
}

export default ApartmentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 10,
        // justifyContent: 'center',
    },
    image: {
        height: '25%',
        resizeMode: 'contain',
    },
    title: {
        marginVertical: 10,
        fontSize: 25,
        fontWeight: 'bold',
    },
    desContainer: {
        flexDirection: 'row',
        borderBottomColor: 'grey',
        borderBottomWidth: 0.7,
        marginTop: 5,
        alignItems: 'center'
    },
    textTitle: {
        color: '#6D1D3A',
        fontSize: 15,
        padding: 10,
    },
    textDes: {
        fontSize: 15,
        padding: 10,
        color: '#242A53'
    },
    buttonContainer: {
        margin: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    itemContainer: {
        margin: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 0.7,
        elevation: 5,
    }
})