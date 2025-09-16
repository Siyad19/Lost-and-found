import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { widthPercentageToDP as widthScale, heightPercentageToDP as heightScale } from 'react-native-responsive-screen';

export default function CustomBtn({ title, onPress, width = '75%', height = '7%',  }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient
                colors={['#9b5cffff', '#691ef5ff', '#2550fdff']}
                locations={[0, 0.48, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                    styles.button,
                    { width: widthScale(width), height: heightScale(height) }
                ]}
            >
                <Text style={styles.btnText}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: widthScale('2%'),
    },
    btnText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: widthScale('4%')
    },
})