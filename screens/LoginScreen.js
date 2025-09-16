import { View, Text, TextInput, TouchableOpacity, Alert, StatusBar, Image } from 'react-native'
import React, { useState } from 'react'
import styles from '../styles/LoginStyle'
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../config.js';
import CustomBtn from '../components/ButtonStyle.js';

export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            console.log("Response Data:", data);
            if (response.ok) {
                await AsyncStorage.setItem('token', data.token);
                await AsyncStorage.setItem('username', data.user.username);
                await AsyncStorage.setItem("userId", data.user._id);
                await AsyncStorage.setItem('userData', JSON.stringify(data.user));
                Alert.alert('Login Successful');
                console.log("Navigating to Signup...");
                navigation.replace('Location');
            } else {
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong');
            console.log("Error:", error);
        }

    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='light' />
            {/* <View style={styles.header}>
                <Text style={styles.titleText}>Log In</Text>
            </View> */}
            <View style={styles.itemContainer}>
                <View style={styles.greet}>
                    <Text style={styles.greetText}>{`Hey, 
Welcome
Back.`}</Text>
                </View>
                <TextInput
                    placeholder='Email Address'
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    placeholderTextColor='#7F8CAA' />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                    placeholderTextColor='#7F8CAA' />
                <View style={styles.forgetPass}>
                    <Text style={{ color: '#1AA7EC' }} onPress={() => navigation.navigate('Forgot')}>Forgot Password?</Text>
                </View>
                
                <CustomBtn title='Log In' onPress={handleLogin} style={styles.button} />
                <Text style={styles.subText}>or continue with</Text>       

                <TouchableOpacity style={styles.button} >
                    <Image source={require('../assets/Google-icon.png')} resizeMode='contain' style={styles.googleIcon}/>
                    <Text style={styles.btnText}>Google Account</Text>
                </TouchableOpacity> 
                <View style={styles.signup}>
                    <Text style={styles.subText}>Don't have an account? <Text style={{ color: '#1AA7EC' }} onPress={() => navigation.navigate('Signup')}>Sign Up</Text></Text>
                </View>
                {/* <Text style={{marginTop:200}} onPress={() => navigation.navigate('NavBar')}>skip</Text> */}
            </View>
        </SafeAreaView>
    )
}

{/* <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.titleText}>Text</Text>
        </View>
        <View style={styles.itemContainer}>
             <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.btnText}>btn text</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView> */}