import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import styles from "../styles/LostStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import API_BASE_URL from '../config.js';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";

export default function LostScreen({ navigation }) {
  const [items, setItems] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetch(`${API_BASE_URL}/api/items`)
        .then((res) => res.json())
        .then((data) => setItems(data))
        .catch((err) => console.error("Error fetching items:", err));
    }, [])
  );

  const lostItems = items.filter(item => item.status === "lost");

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Item", { itemId: item._id })}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{item.title}</Text>
      <Text style={styles.foundOn}>Lost On: {item.date?.split("T")[0]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
      <TouchableOpacity onPress={()=> navigation.navigate('NavBar')}><Ionicons name="chevron-back-sharp" style={styles.backBtn}/></TouchableOpacity> 
        <Text style={styles.titleText}>Lost Items</Text>
        <TouchableOpacity><Ionicons style={styles.backBtn}/></TouchableOpacity> 
      </View> */}
      <View style={styles.itemContainer}>
        <FlatList
          data={lostItems}
          numColumns={2}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderItem}
          columnWrapperStyle={styles.row}
        />
      </View>
      <LinearGradient
        colors={['#9b5cff', '#691ef5', '#2550fd']}
        locations={[0, 0.48, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.addBtn}>
          <TouchableOpacity onPress={() => navigation.navigate('AddItem')}>
            <Ionicons name="add" style={styles.addIcon} />
          </TouchableOpacity>
      </LinearGradient>


    </View>
  );
};

