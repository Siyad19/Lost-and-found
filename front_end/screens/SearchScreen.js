import {
  View, Text, TouchableOpacity, TextInput,
  FlatList, ActivityIndicator, Alert, Image
} from 'react-native';
import React, { useState, useEffect, use } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles/SearchStyle';
import { Ionicons } from '@expo/vector-icons';
import API_BASE_URL from '../config.js';
import { LinearGradient } from 'expo-linear-gradient'

export default function SearchScreen({ navigation }) {
  const categories = [
    { name: "bag", icon: 'bag' },
    { name: "keys", icon: 'key' },
    { name: "phone", icon: 'phone-portrait' },
    { name: "pets", icon: 'paw' },
    { name: "wallet", icon: 'wallet' },
    { name: "documents", icon: 'document-text' },
    { name: "bicycle", icon: 'bicycle' },
    { name: "gadgets", icon: 'headset' },
    { name: "cards", icon: 'card' },
    { name: "others", icon: 'ellipsis-horizontal-circle-sharp' },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [numColumns, setNumColumns] = useState(5); // Default 4 columns


  useEffect(() => {
    console.log("Updated Items State:", items);
  }, [items]);

  // Fetch items by category
  const fetchItemsByCategory = async (category) => {
    setLoading(true);
    try {
      console.log("Fetching items for category:", category);
      const response = await fetch(`${API_BASE_URL}/api/items/category/${category}`);
      const data = await response.json();

      console.log("Fetched Data:", data);
      if (data.success && Array.isArray(data.items)) {
        setItems(data.items);
      } else {
        console.warn("Unexpected API response format:", data);
        setItems([]);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      Alert.alert("Error", "Could not fetch items. Please try again.");
    }
    setLoading(false);
  };

  // Search items by title
  const searchItems = async () => {
    if (!searchText.trim()) {

      return;
    }

    setLoading(true);
    try {
      console.log("Searching for:", searchText);
      const response = await fetch(`${API_BASE_URL}/api/items/search?title=${encodeURIComponent(searchText)}`);
      const data = await response.json();
      console.log("Search Results:", data);
      setItems(data);
      setHasSearched(true);
    } catch (error) {
      console.error("Error searching items:", error);
      Alert.alert("Error", "Could not fetch search results. Please try again.");
    }
    setLoading(false);
  };
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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titleText}>Search</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for items here."
          style={styles.input}
          value={searchText}
          returnKeyType="search"
          placeholderTextColor='#7F8CAA'
          onSubmitEditing={searchItems}
          onChangeText={(text) => {
            setSearchText(text);
            if (text === '') setHasSearched(false);
          }}
          onFocus={() => setIsSearching(true)}  // Hide categories when searching
          onBlur={() => setIsSearching(false)}  // Show categories when search loses focus
        />
        <Ionicons name="search-outline" style={styles.searchIcon} onPress={searchItems} />
      </View>

      {/* Category Section (Hidden when searching) */}
      {!isSearching && !hasSearched && (
        <View style={styles.categories}>
          <Text style={[styles.subText, { marginBottom: 10 }]}>Categories</Text>
          <FlatList
            data={categories}
            key={`columns-${numColumns}`} // Forces full re-render when numColumns changes
            keyExtractor={(item, index) => index.toString()}
            numColumns={numColumns} // Set dynamic number of columns
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  console.log("Category clicked:", item.name);
                  setSelectedCategory(item.name);
                  fetchItemsByCategory(item.name);
                }}
              >
                {selectedCategory === item.name ? (
                  // ✅ Gradient background when selected
                  <LinearGradient
                    colors={['#9b5cff', '#691ef5', '#2550fd']}
                    locations={[0, 0.48, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.categoryItem}
                  >
                    <Ionicons name={item.icon} size={30} color="white" />
                  </LinearGradient>
                ) : (
                  <View style={[styles.categoryItem, { backgroundColor: "#000000" }]}>
                    <Ionicons name={item.icon} size={30} color="white" />
                    
                  </View>
                )}
              </TouchableOpacity>

            )}
          />
        </View>
      )
      }
      {/* Founded Items Section */}

      <View style={styles.foundItems}>
        <Text style={[styles.subText, { marginBottom: 10 }]}>Founded Items</Text>

        {/* Loading Indicator */}
        {loading ? (
          <ActivityIndicator size="large" color="#3498db" />
        ) : items.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={items}
            keyExtractor={(item, index) => item._id ? item._id.toString() : index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate("Item", { itemId: item._id })}
              >
                <View>
                  <Image source={{ uri: item.imageUrl }} style={styles.image} />
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
            ListEmptyComponent={
              !loading && (
                <Text style={{ textAlign: "center", marginTop: 20, fontSize: 16, color: '#fff' }}>
                  No items found {selectedCategory ? `for "${selectedCategory}"` : ""}
                </Text>
              )
            }
            ListFooterComponent={loading && <ActivityIndicator size="large" color="#3498db" />}
            contentContainerStyle={{ paddingBottom: 20 }} // Extra space at bottom
          />


        ) : (
          <Text style={{ textAlign: "center", marginTop: 20, fontSize: 16, color: '#fff' }}>
            No items found {selectedCategory ? `for "${selectedCategory}"` : ""}
          </Text>
        )}
      </View>
    </SafeAreaView >
  );
}
