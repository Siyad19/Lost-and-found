import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../config.js';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/ChooseLocationStyle.js';
import { LocationContext } from "../context/LocationContext";

export default function ChooseLocationScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const { setUserLocation } = useContext(LocationContext);

  // Fetch suggestions from OpenStreetMap as user types
  const searchLocation = async (text) => {
    setQuery(text);
    if (text.length > 2) {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(text)}&format=json&addressdetails=1&limit=5`,
          { headers: { 'User-Agent': 'MyApp/1.0' } } // required by Nominatim
        );
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
      }
    } else {
      setResults([]);
    }
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
        navigation.navigate('NavBar');
      } else {
        Alert.alert("Error", data.error || "Failed to update location.");
      }
    } catch (error) {
      console.error("Error updating location:", error);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  const handleSelectLocation = async (item) => {
    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);

    // Update context
    setUserLocation({ lat, lng: lon });

    // Update backend
    await updateLocation(lat, lon);

    console.log("Selected:", item.display_name, lat, lon);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-sharp" style={styles.backBtn} />
        </TouchableOpacity>
        <Text style={styles.titleText}>Choose Location</Text>
        <View></View>
      </View>

      {/* Search Input */}
      <View style={styles.itemContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter city or location"
          value={query}
          onChangeText={searchLocation}
          placeholderTextColor="#7F8CAA"
        />
      

      {/* Suggestions List */}
      {results.length > 0 && (
        <FlatList
        style={styles.locations}
          data={results}
          keyExtractor={(item) => item.place_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ paddingVertical: 15 }}
              onPress={() => handleSelectLocation(item)}
            >
              <Text style={styles.locationText}>{item.display_name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      </View>
      
    </SafeAreaView>
  );
}
