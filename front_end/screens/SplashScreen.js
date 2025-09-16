import React, { useEffect } from "react";
import { View, StyleSheet,Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";


const SplashScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {
        const checkLogin = async ()=> {
            const token = await AsyncStorage.getItem('token');
            setTimeout(() => {
                if(token){
                    navigation.navigate('NavBar');
                } else{
                    navigation.navigate('GetStarted');
                }
            
        }, 3000);
        };
        checkLogin();
    }, []);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logoDark.png')} style={styles.image}/>
            <Text>Lost it? Found it!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#000000'
    },
    image:{
        width:300,
        height:300
    }
})

export default SplashScreen;