import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, Image } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles/SavedPostStyle'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import API_BASE_URL from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function SavedPostScreen({ navigation }) {

    const [savedItems, setSavedItems] = useState([]);
    const [loading, isLoading] = useState(true);
    const statusColor = (status) => {
        switch (status) {
            case 'lost': return '#FF3F33';
            case 'found': return '#FFD95F';
            case 'returned': return '#78C841';
            default: return '#fff';
        }
    }

    useFocusEffect(
        useCallback(() => {
            getSavedItems();
        }, [])
    )

    const getSavedItems = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const res = await fetch(`${API_BASE_URL}/api/saved-Items`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            setSavedItems(data);
        } catch (error) {
            console.log("error fetching saved items", error);

        } finally {
            isLoading(false);
        }
    };

    if(loading){
        return <ActivityIndicator size="large" style={{flex:1, backgroundColor:'#000'}}/>
    }
    if (savedItems.length === 0) {
        return <SafeAreaView style={styles.noSavedItems}><View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} ><Ionicons name='chevron-back' style={styles.backBtn} /></TouchableOpacity>
                <Text style={styles.titleText}>Saved items</Text>
            </View><Text style={styles.noSavedItemsText}>No saved Items</Text></SafeAreaView>
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} ><Ionicons name='chevron-back' style={styles.backBtn} /></TouchableOpacity>
                <Text style={styles.titleText}>Saved posts</Text>
            </View>
            <View style={styles.itemContainer}>
                <FlatList
                    data={savedItems}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.card} onPress={()=> navigation.navigate('Item', {itemId :item._id})}>
                            <Image source={{ uri: item.imageUrl }} style={styles.image} />
                            <Text style={styles.itemName}>{item.title}</Text>
                            <Text style={styles.itemDate}>{item.date?.split("T")[0]}</Text>
                            <Text style={[styles.itemStatus, {color : statusColor(item.status)}]}>{item.status}</Text>
                        </TouchableOpacity>
                    )}
                    numColumns={2} />
            </View>
        </SafeAreaView>
    )
}