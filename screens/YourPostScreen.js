import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from '../styles/YourPostStyle'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../config';
import { LinearGradient } from 'expo-linear-gradient'

export default function YourPostScreen({ navigation }) {

    const [myPosts, setMyPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const statusColor = (status) => {
        switch (status) {
            case 'lost': return '#FF3F33';
            case 'found': return '#FFD95F';
            case 'returned': return '#78C841';
            default: return '#fff';
        }
    }

    const fetchMyPosts = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            const response = await fetch(`${API_BASE_URL}/api/items/my-posts`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            setMyPosts(data);
        } catch (err) {
            console.error('Error fetching my posts:', err);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchMyPosts();
    }, []);

    if (loading){
         return <ActivityIndicator size="large" style={{flex:1, backgroundColor:'#000'}}/>;
    }
     if (myPosts.length === 0) {
        return <SafeAreaView style={styles.noItems}><View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} ><Ionicons name='chevron-back' style={styles.backBtn} /></TouchableOpacity>
                <Text style={styles.titleText}>Your posts</Text>
            </View><Text style={styles.noItemsText}>No Items found</Text></SafeAreaView>
    }

    const handleToggleReturn = async (itemId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/items/${itemId}/toggle-return`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Failed to toggle return status');

            const updatedItem = await response.json();

            // ✅ Update the correct list that's displayed
            setMyPosts((prevItems) =>
                prevItems.map((item) =>
                    item._id === updatedItem._id ? updatedItem : item
                )
            );
        } catch (error) {
            console.error("Toggle return failed:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} ><Ionicons name="chevron-back-sharp" style={styles.backBtn}></Ionicons></TouchableOpacity>
                <Text style={styles.titleText}>Your Posts</Text>

            </View>
            <View style={styles.itemContainer}>
                <FlatList
                    data={myPosts}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.postItem}>
                            <View>
                                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                            </View>
                            <View style={styles.itemInfo}>
                                <Text style={{ fontWeight: 'bold', color: '#ffffff', }}>{item.title}</Text>
                                <Text style={{ color: '#ffffff', }}>{item.description.length > 25
                                    ? item.description.substring(0, 25) + "..."
                                    : item.description}</Text>
                                <Text style={{ color: '#ffffff', }}>{item.date?.split("T")[0]}</Text>
                            </View>
                            <View style={styles.status}>
                                <Text style={[styles.statusText, {color: statusColor(item.status)}]}>
                                    {item.status.charAt(0).toLowerCase() + item.status.slice(1)}
                                </Text>

                            </View>
                            <LinearGradient
                                colors={['#9b5cffff', '#691ef5ff', '#2550fdff']}
                                locations={[0, 0.48, 1]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.markAsReturn}>
                                <TouchableOpacity
                                    onPress={() => handleToggleReturn(item._id)}
                                >
                                    <Text style={styles.returnText}>
                                        {item.status === "returned" ? "Mark as Not Returned" : "Mark as Returned"}
                                    </Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}