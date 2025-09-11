import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, loading } from 'react-native';
import React, { useState } from 'react';
import styles from '../styles/ForgotStyle.js';
import { SafeAreaView } from "react-native-safe-area-context";
import API_BASE_URL from '../config.js';
import CustomBtn from '../components/ButtonStyle.js'
import { OtpInput } from "react-native-otp-entry";

export default function OtpScreen({ route, navigation }) {
    const { email } = route.params;
    const [otp, setOtp] = useState("");

    const verifyOtp = async () => {
        if (!otp) {
            Alert.alert("Error", "Please enter the OTP");
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Success", "Enter new password.");
                navigation.navigate("Reset", { email, otp }); // Navigate to Reset Password
            } else {
                Alert.alert("Error", data.message || "Invalid OTP");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            Alert.alert("Error", "Network error. Please try again.");
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleText}>OTP Verification</Text>
            </View>
            <View style={styles.itemContainer}>
                {/* <TextInput
                    placeholder='Enter the OTP'
                    value={otp}
                    onChangeText={setOtp}
                    style={styles.input} 
                    keyboardType="number-pad"
                    placeholderTextColor='#7F8CAA'
                /> */}

                <OtpInput
                    numberOfDigits={6}
                    focusColor="white"
                    type="numeric"
                    keyboardType="number-pad"
                    onTextChange={(text) => setOtp(text)}   // updates OTP as you type
                    onFilled={(text) => {
                        setOtp(text);
                        console.log("OTP Filled:", text);
                    }}
                    theme={{
                        containerStyle: styles.otpInput,
                        pinCodeContainerStyle: styles.pinCodeContainer,
                        pinCodeTextStyle: styles.pinCodeText,
                    }} />

                {loading ? (
                    <ActivityIndicator size="large" style={styles.loading} />
                ) : (
                    <CustomBtn title="Continue" onPress={verifyOtp} />
                )}

            </View>

        </SafeAreaView>
    );
}
