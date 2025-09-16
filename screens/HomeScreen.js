import {
  View, Text, TouchableOpacity, ActivityIndicator, Dimensions, Image, FlatList, StatusBar
} from "react-native";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/HomeStyle";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import { LocationContext } from "../context/LocationContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../config.js';
import { useFocusEffect } from '@react-navigation/native';
import * as Location from "expo-location";

export default function HomeScreen({ navigation }) {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latestItems, setLatestItems] = useState([]);
  const { userLocation } = useContext(LocationContext);
  const [username, setUsername] = useState('');
  const { width } = Dimensions.get("window");
  const [placeName, setPlaceName] = useState("");

  useFocusEffect(
    useCallback(() => {
      const loadUserData = async () => {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      };

      loadUserData();
    }, []) // re-run when screen is focused
  );

  useEffect(() => {
    const fetchLatestItems = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/items/latest`);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const data = await response.json();
        setLatestItems(data);
      } catch (error) {
        console.error('Error fetching latest posts:', error);
        setError(error.message);
      }
    };

    fetchLatestItems();
  }, []);
  // 
  useEffect(() => {
    const getPlaceName = async () => {
      // Your coordinates
      const coords = { latitude: 10.60648950027181, longitude: 76.60388474063909 };

      // Reverse geocode
      let result = await Location.reverseGeocodeAsync(coords);

      if (result.length > 0) {
        let loc = result[0];
        setPlaceName(`${loc.city}, ${loc.region}, ${loc.country}`);
      }
    };

    getPlaceName();
  }, []);

  useEffect(() => {
    console.log("HomeScreen sees location:", userLocation);
    if (!userLocation) return;

    const fetchItems = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/items/recently-found?lat=${userLocation.lat}&lng=${userLocation.lng}&radius=10000`
        );
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [userLocation]);

  if (!userLocation) {
    return <Text style={styles.noItems}>Fetching location...</Text>;
  }

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, backgroundColor: '#000' }} />;
  }

  const statusColor = (status) => {
    switch (status) {
      case 'lost': return '#FF3F33';
      case 'found': return '#FFD95F';
      case 'returned': return '#78C841';
      default: return '#fff';
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('ChooseLocation')} style={{ flexDirection: 'row' }}>
          <Ionicons name="location-sharp" style={styles.headerIcons} /><View style={{justifyContent:'center'}}><Text style={styles.locationText}>{placeName ? placeName : "Loading..."}</Text></View>
        </TouchableOpacity>
        {/* <Text style={styles.titleText}>Home</Text> */}
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Ionicons name="notifications" style={styles.headerIcons} />
        </TouchableOpacity>
      </View>

      {/* Greeting Section */}
      <View style={styles.itemContainer}>
        <View style={styles.greeting}>
          <Text style={styles.titleText}>Hello, {username} 👋</Text>
          <Text style={{ color: '#fff' }} >Welcome to Lost and Found app</Text>
        </View>

        {/* Recently Found Items Swiper */}
        <View style={styles.swiper}>
          <Text style={styles.subText}>Recently found items near by you</Text>
          {items.length > 0 ? (
            <Swiper autoplay autoplayTimeout={3} showsPagination dotColor="#7F8CAA" dotStyle={{ width: 15, height: 6 }} activeDotStyle={{ width: 30, height: 6 }}>
              {items.map((item) => {
                // Extract and format date (YYYY-MM-DD)
                const Date = item.date ? item.date.split("T")[0] : "Unknown Date";

                return (
                  <TouchableOpacity key={item._id} style={styles.slide} onPress={() => navigation.navigate("Item", { itemId: item._id })}>
                    <Image source={{ uri: item.imageUrl }} style={styles.image} />
                    <View style={styles.itemDetails}>
                      <Text style={styles.caption}>{item.title}</Text>
                      <Text style={styles.itemDescription}>{item.description.length > 20
                        ? item.description.substring(0, 20) + "..."
                        : item.description}</Text>

                      <Text style={styles.itemDescription}>Found on: {Date}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </Swiper>
          ) : (
            <View>
              {/* <Text style={styles.noItemsText}>No recently found items nearby</Text> */}
              <Image source={require('../assets/noitemfound.png')} style={styles.noRecentFound} resizeMode="contain" />
            </View>
          )}
        </View>

        <View style={styles.foundItems}>
          <Text style={[styles.subText1, { marginBottom: 10 }]}>Latest posts</Text>

          {/* Loading Indicator */}
          {loading ? (
            <ActivityIndicator size="large" color="#7F8CAA" />
          ) : latestItems && latestItems.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={latestItems}
              keyExtractor={(item, index) => item._id ? item._id.toString() : index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => navigation.navigate("Item", { itemId: item._id })}
                >
                  <View>
                    <Image source={{ uri: item.imageUrl }} style={styles.imageOnPost} />
                  </View>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemText}>{item.title}</Text>
                    <Text style={{ color: '#fff' }}>
                      {item.description.length > 25
                        ? item.description.substring(0, 25) + "..."
                        : item.description}
                    </Text>
                    <Text style={{ color: '#fff' }}>Found On: {item.date?.split("T")[0]}</Text>
                  </View>
                  <View style={styles.statusContainer}>
                    <Text style={[styles.statusText, { color: statusColor(item.status) }]}>{item.status}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={styles.noItemsText}>No posts available.</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
