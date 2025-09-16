import { View, Text, TouchableOpacity, TextInput, Image, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/AddStyle';
import * as ImagePicker from 'expo-image-picker'
import MapView, { Marker } from "react-native-maps";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from '../config.js';
import CustomBtn from '../components/ButtonStyle.js';

export default function AddScreen({ navigation }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("lost");
    const [category, setCategory] = useState("Select");
    const [location, setLocation] = useState(null);
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);

    const [items, setItems] = useState([
        { label: "Bag", value: "bag" },
        { label: "Keys", value: "keys" },
        { label: "Phone", value: "phone" },
        { label: "Documents", value: "documents" },
        { label: "Bicycle", value: "bicycle" },
        { label: "Gadgets", value: "gadgets" },
        { label: "Pets", value: "pets" },
        { label: "Cards", value: "cards" },
        { label: "Wallet", value: "wallet" },
        { label: "Others", value: "others" },
    ]);


    // 🔵 Pick Image Function
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"], // Only select images
            allowsMultipleSelection: true, // Enable multi-selection
            selectionLimit: 1, // Limit the number of images to 1
            quality: 1, // High quality
            aspect: [4, 3],
            allowsEditing: true
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        if (!title || !description || !category || !location) {
            Alert.alert("Error", "Please fill all fields and select a location.");
            return;
        }
    
        try {
            const token = await AsyncStorage.getItem("token"); // Get stored token
    
            const response = await fetch(`${API_BASE_URL}/api/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Include token for authentication
                },
                body: JSON.stringify({
                    title,
                    description,
                    location: {
                        type: "Point", // Required for GeoJSON
                        coordinates: [location.longitude, location.latitude], // Correct format
                    },
                    imageUrl: image || "", // Ensure image is not undefined
                    status: status === "lost" || status === "found" ? status : "lost", // Validate status
                    category,
                }),
            });
    
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }
    
            Alert.alert("Success", "Item added successfully!");
            navigation.navigate('LostAndFound');
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    // 📍 Select Location on Map
    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setLocation({ latitude, longitude });
        console.log(latitude, longitude)
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} ><Ionicons name="chevron-back-sharp" style={styles.backBtn}></Ionicons></TouchableOpacity>
                <Text style={styles.titleText}>New Post</Text>
            </View>
            <View style={styles.itemContainer}>
                <ScrollView style={styles.itemScroll} showsVerticalScrollIndicator={false}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                        placeholder='eg. Leather wallet' 
                        placeholderTextColor="#7F8CAA"/>

                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.inputDes}
                        value={description}
                        onChangeText={setDescription}
                        placeholder='Write something about the item'
                        placeholderTextColor="#7F8CAA"
                    />

                    <Text style={styles.label}>Status</Text>
                    <View style={styles.statusContainer}>
                        <TouchableOpacity onPress={() => setStatus('lost')} style={[styles.statusBtn, status === "lost" ? { backgroundColor: '#000000' } : { backgroundColor: '#333446c' }]}>
                            <Text style={[styles.statusBtnText, status === 'lost' ? { color: "#ffffff" } : { color: '#7F8CAA' }]}>Lost</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setStatus('found')} style={[styles.statusBtn, status === "found" ? { backgroundColor: '#000000' } : { backgroundColor: '#333446' }]}>
                            <Text style={[styles.statusBtnText, status === 'found' ? { color: "#ffffff" } : { color: '#7F8CAA' }]}>Found</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Category</Text>
                    <DropDownPicker
                        open={open}
                        value={category}
                        items={items}
                        setOpen={setOpen}
                        setValue={setCategory}
                        setItems={setItems}
                        style={styles.dropdown}
                        textStyle={styles.dropdownText}
                        listMode="SCROLLVIEW"
                        dropDownContainerStyle={{backgroundColor:'#333446'}}
                    />

                    <Text style={styles.label}>Select Location</Text>
                    <MapView style={styles.map} onPress={handleMapPress}>
                        {location && <Marker coordinate={location} />}
                    </MapView>
                    
                    <Text style={styles.label}>Upload Image</Text>
                    <Ionicons name="cloud-upload" style={styles.uploadIcon}/>
                    <TouchableOpacity onPress={pickImage} style={styles.uploadBox}>
                        {image ? (
                            <Image source={{ uri: image }} style={styles.thumbnail} />
                        ) : (
                            <Text style={styles.addText}>Upload Image</Text>
                        )}
                    </TouchableOpacity>
                    <CustomBtn title="Post item" width='90%' onPress={handleSubmit}/>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}