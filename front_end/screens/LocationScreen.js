import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Image, TextInput } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import styles from '../styles/LocationStyle';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import API_BASE_URL from '../config.js';
import { LocationContext } from "../context/LocationContext";
import CustomBtn from '../components/ButtonStyle.js';

export default function LocationScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');
    const [manualMode, setManualMode] = useState(false);
    const [cityName, setCityName] = useState("");
    const { setUserLocation } = useContext(LocationContext);

    // Fetch username
    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const storedUsername = await AsyncStorage.getItem('username');
                if (storedUsername) setUsername(storedUsername);
            } catch (error) {
                console.error("Error fetching username:", error);
            }
        };
        fetchUsername();
    }, []);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const savedToken = await AsyncStorage.getItem("token");
                if (savedToken) {
                    setToken(savedToken);
                } else {
                    Alert.alert("User authentication required.", "Please log in again.");
                }
            } catch (error) {
                console.error("Error fetching token:", error);
            }
        };
        loadToken();
    }, []);


    const getLocation = async () => {
        if (!token) {
            Alert.alert("Error", "User authentication required.");
            return;
        }

        setLoading(true);
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission Denied", "Allow location access to update your location.");
                setLoading(false);
                return;
            }

            let locationData = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = locationData.coords;
            setLocation({ latitude, longitude });

            // ✅ Update frontend LocationContext
            setUserLocation({ lat: latitude, lng: longitude });

            // ✅ Update backend
            await updateLocation(latitude, longitude);
        } catch (error) {
            console.error("Error getting location:", error);
            Alert.alert("Error", "Could not fetch location.");
        }
        setLoading(false);
    };


    const updateLocation = async (latitude, longitude) => {
        const token = await AsyncStorage.getItem("token");

        try {
            const response = await fetch(`${API_BASE_URL}/api/location/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ lat: latitude, lng: longitude }),
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert("Success", "Location updated successfully!");
                navigation.navigate('NavBar')
            } else {
                Alert.alert("Error", data.error || "Failed to update location.");
            }
        } catch (error) {
            console.error("Error updating location:", error);
            Alert.alert("Error", "Something went wrong.");
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} ><Ionicons name="chevron-back-sharp" style={styles.backBtn}></Ionicons></TouchableOpacity>
                <Text style={styles.titleText}></Text>
                <View></View>
            </View>
            <View style={styles.itemContainer}>
                <Image source={require('../assets/location-pin_13108342.png')} style={styles.icon} resizeMode='contain' />
                <Text style={styles.titleText}>Hi, {username}!</Text>
                <View style={styles.description}>
                    <Text style={styles.subText}>Set your location to find lost</Text>
                    <Text style={[styles.subText, {marginBottom: 30}]}>items near you!</Text>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="blue" />
                ) : (
                    <CustomBtn title='Use current Location' onPress={getLocation}/>
                )}

                <TouchableOpacity style={styles.manualBtn} onPress={() => navigation.navigate('ChooseLocation')}>
                    <Ionicons name='navigate' size={25} color='#7F8CAA'/>
                    <Text style={styles.btn2Text}> Enter Location Manually</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}
