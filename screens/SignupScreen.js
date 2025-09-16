import { View, Text, TextInput, TouchableOpacity,Alert, Image } from 'react-native';
import React, { useState } from 'react';
import styles from '../styles/SignupStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../config.js';
import CustomBtn from '../components/ButtonStyle.js';

export default function SignupScreen({ navigation }) {

  const [ email, setEmail ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password,  setPassword ] = useState('');
  const [ mobileNumber, setMobileNumber ] = useState('');

  const handleSignup = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password, mobileNumber })
      });

      const data = await response.json();

      if (!response.ok) {
          Alert.alert('Signup Failed', data.message);
          return;
      }

      // Store token & navigate to login screen
      await AsyncStorage.setItem('token', data.token);
      Alert.alert('Signup Successful', 'You can now log in!');
      navigation.replace('Login'); // Navigate to Login Screen

  } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
  }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.titleText}>Create Account</Text>
      </View> */}
       
      <View style={styles.itemContainer}>
        <View style={styles.greet}>
                    <Text style={styles.greetText}>{`Let's get 
Started.`}</Text>
                </View>
      <TextInput
          placeholder='Username'
          value={username}
          onChangeText={setUsername}
          style={styles.input} 
          placeholderTextColor='#7F8CAA'/>
        <TextInput
          placeholder='Email Address'
          value={email}
          onChangeText={setEmail}
          style={styles.input} 
          placeholderTextColor='#7F8CAA'/>
        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input} 
          placeholderTextColor='#7F8CAA'/>
        <TextInput
          placeholder='Mobile Number'
          value={mobileNumber}
          onChangeText={setMobileNumber}
          style={[styles.input, {marginBottom:40}]} 
          placeholderTextColor='#7F8CAA'/>

        <CustomBtn title="Sign up" onPress={handleSignup} />

        <Text style={styles.subText}>or continue with</Text>

         <TouchableOpacity style={styles.button} >
                    <Image source={require('../assets/Google-icon.png')} resizeMode='contain' style={styles.googleIcon}/>
                    <Text style={styles.btnText}>Google Account</Text>
                </TouchableOpacity> 
        <View style={styles.signup}>
          <Text style={styles.signupText}>Already have an account? <Text style={{ color: '#1AA7EC' }} onPress={() => navigation.navigate('Login')}>Login</Text></Text>
        </View>
      </View>
    </SafeAreaView>
  )
}