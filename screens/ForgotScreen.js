import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import styles from '../styles/ForgotStyle.js';
import { SafeAreaView } from "react-native-safe-area-context";
import API_BASE_URL from '../config.js';
import CustomBtn from '../components/ButtonStyle.js';

export default function ForgotScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

        const requestOtp = async () => {
            if (!email) {
              Alert.alert("Error", "Please enter your email");
              return;
            }
            setLoading(true);
        
            try {
              const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
              });
        
              const data = await response.json();
        
              if (response.ok) {
                Alert.alert("Success", "OTP has been sent to your email");
                navigation.navigate("Otp", { email }); // Navigate to OTP screen
              } else {
                Alert.alert("Error", data.message || "Something went wrong");
              }
            } catch (error) {
              Alert.alert("Error", "Network error. Please try again.");
            }

        setLoading(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleText}>Forgot Password</Text>
            </View>
            <View style={styles.itemContainer}>
                <TextInput
                    placeholder='Email Address'
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input} 
                    placeholderTextColor='#7F8CAA'/>

                {loading ? (
                    <ActivityIndicator size="large" style={styles.loading} />
                ) : (
                    <CustomBtn title="Get OTP" onPress={requestOtp}/>
                )}
            </View>
            
        </SafeAreaView>
    );
}
{/* <TouchableOpacity style={styles.button} onPress={requestOtp}>
                        <Text style={styles.btnText}>Continue</Text>
                    </TouchableOpacity> */}