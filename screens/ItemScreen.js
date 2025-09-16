import { View, Text, Image, ActivityIndicator, TouchableOpacity, Linking, Alert } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles/ItemStyle';
import { Ionicons } from '@expo/vector-icons';
import API_BASE_URL from '../config.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import CustomBtn from '../components/ButtonStyle.js';

export default function ItemScreen({ navigation }) {
    const route = useRoute();
    const { itemId } = route.params;
    
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [placeName, setPlaceName] = useState("");
    const [isSaved, setIsSaved] = useState(false);

    // Fetch item details
    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/items/${itemId}`);
                const data = await response.json();
                setItem(data);
            } catch (error) {
                console.error("Error fetching item:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItemDetails();
    }, [itemId]);

    // Reverse geocode location
    useEffect(() => {
        if (item?.location?.coordinates) {
            const getPlaceName = async () => {
                try {
                    const [lng, lat] = item.location.coordinates;
                    let result = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
                    if (result.length > 0) {
                        const { city, region, country } = result[0];
                        setPlaceName(`${city || ''}, ${region || ''}, ${country || ''}`);
                    }
                } catch (error) {
                    console.log("Error reverse geocoding:", error);
                }
            };
            getPlaceName();
        }
    }, [item]);

    // Fetch saved status whenever screen focuses
    useFocusEffect(
        useCallback(() => {
            const fetchSavedStatus = async () => {
                try {
                    const token = await AsyncStorage.getItem("token");
                    const res = await fetch(`${API_BASE_URL}/api/saved-items`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const savedItems = await res.json();
                    const savedIds = savedItems.map(i => i._id);
                    setIsSaved(savedIds.includes(itemId));
                } catch (err) {
                    console.error("Error fetching saved status:", err);
                }
            };
            fetchSavedStatus();
        }, [itemId])
    );

    const toggleSave = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const res = await fetch(`${API_BASE_URL}/api/saved-items/${itemId}/toggle`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setIsSaved(data.saved);
            Alert.alert(
                data.saved ? "Success" : "Removed",
                data.saved ? "Item saved" : "Item removed"
            );
        } catch (error) {
            console.error("Error toggle saved:", error);
        }
    };

    const openGoogleMaps = () => {
        if (item?.location?.coordinates) {
            const lat = item.location.coordinates[1];
            const lng = item.location.coordinates[0];
            Linking.openURL(`https://www.google.com/maps?q=${lat},${lng}`);
        }
    };

    const viewProfile = () => {
        navigation.navigate("User", { userId: item.user._id });
    };

    // ✅ Return after hooks
    if (loading) {
        return <ActivityIndicator size="large" style={{flex:1, backgroundColor:'#000'}} />;
    }

    if (!item) {
        return <Text style={styles.errorText}>Item not found</Text>;
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='chevron-back' style={styles.headerIcons} />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleSave}>
                    <Ionicons
                        name={isSaved ? 'bookmark' : 'bookmark-outline'}
                        style={styles.headerIcons}
                    />
                </TouchableOpacity>
            </SafeAreaView>
            <View style={styles.itemDetails}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.imageUrl }} style={styles.image} />
                </View>
                <View style={styles.itemName}>
                    <Text style={styles.itemNameText}>{item.title}</Text>
                    <Text style={styles.descriptionText}>{item.description}</Text>
                </View>
                <View style={styles.location}>
                    <TouchableOpacity style={styles.location} onPress={openGoogleMaps}>
                        <Ionicons name='location' style={styles.infoIcon} />
                        <Text style={styles.infoText}>{placeName}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.itemInfo}>
                    <View style={styles.date}>
                        <Ionicons name='calendar' style={styles.infoIcon} />
                        <Text style={styles.infoText}>{item.date?.split("T")[0]}</Text>
                    </View>
                    <View style={styles.status}>
                        <Ionicons name='ribbon' style={styles.infoIcon} />
                        <Text style={styles.infoText}>{item.status}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <CustomBtn title='View profile' onPress={viewProfile} width='86%' />
                </View>
            </View>
        </View>
    );
}
