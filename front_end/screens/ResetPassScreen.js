import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, loading } from 'react-native';
import React, { useState } from 'react';
import styles from '../styles/ResetPassStyle.js';
import { SafeAreaView } from "react-native-safe-area-context";
import API_BASE_URL from '../config.js';
import CustomBtn from '../components/ButtonStyle.js';

export default function ResetPassSrceen({ navigation, route }) {

    const { email, otp } = route.params;
    const [newPassword, setNewPassword] = useState("");

    const resetPassword = async () => {
        if (!newPassword) {
            Alert.alert("Error", "Please enter a new password");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Success", "Password reset successfully!");
                navigation.navigate("Login"); // Go back to login screen
            } else {
                Alert.alert("Error", data.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            Alert.alert("Error", "Network error. Please try again.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleText}>Reset Password</Text>
            </View>
            <View style={styles.itemContainer}>
                <TextInput
                    placeholder='Enter new password'
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                    style={styles.input}
                    placeholderTextColor='#7F8CAA'
                    />   
                {loading ? <ActivityIndicator size="large" style={styles.loading} /> : <CustomBtn title="Change password" onPress={resetPassword}/>}
            </View>
        </SafeAreaView >
    )
}