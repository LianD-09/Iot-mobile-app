import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import {
    StyleSheet,
    Text,
    Pressable,
    View,
    TouchableOpacity,
} from 'react-native';
import QRcode from 'react-native-vector-icons/AntDesign';
import History from 'react-native-vector-icons/MaterialCommunityIcons';

const { height, width } = Dimensions.get('screen');
const screenName = {
    qrCode: 'Create QRCode',
    history: 'AccessHistory',
}
const ApartmentFeatures = (props) => {
    const navigation = useNavigation()

    const displayFeature = (url) => {
        navigation.navigate(url);
    }

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.itemContainer} onPress={() => displayFeature(screenName.qrCode)}>
                <QRcode name="qrcode" color={styles.image.tintColor} size={styles.image.width} />
                <Text style={styles.textTitle}>Create QRCode</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContainer} onPress={() => displayFeature(screenName.history)}>
                <History name="history" color={styles.image.tintColor} size={styles.image.width} />
                <Text style={styles.textTitle}>Access History</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ApartmentFeatures;

const styles = StyleSheet.create({
    buttonContainer: {
        margin: 30,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    itemContainer: {
        padding: width * 0.025,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 0.7,
        elevation: 8,
    },
    image:
    {
        width: width * 0.18,
        tintColor: '#3A5BB3',
    },
    textTitle: {
        fontSize: 13,
        color: '#6D1D3A',
        textAlign: 'center'
    }
})