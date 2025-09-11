import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/ProfileStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import SavedPostScreen from './SavedPostScreen';

export default function ProfileScreen({ navigation }) {

  const [username, setUsername] = useState('');

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

  const handleLogout = async () => {
    try {
      // 1. Remove the token
      await AsyncStorage.removeItem('token');

      // 2. Navigate to login screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const handlePrivacy = () => {
    navigation.navigate('Privacy');
  }
  const handleSettings = () => {
    navigation.navigate('Settings');
  }
  const handleYourPosts = () => {
    navigation.navigate('YourPost');
  }
  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  }
  const handleSavedPosts = () =>{
    navigation.navigate('Saved')
  }

 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleText}>Profile</Text>
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.profile}>
          <LinearGradient
            colors={['#9b5cff', '#691ef5', '#2550fd']}
            locations={[0, 0.48, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ProfileImgContainer}
          >
            <Image source={require('../assets/man-user-circle-icon.png')} style={styles.ProfileImg} />
          </LinearGradient>
          
          <Text style={styles.titleText}>{username}</Text>
        </View>

        <View style={styles.optionList}>
          <TouchableOpacity style={styles.options} onPress={handleEditProfile}><Ionicons name="create" style={styles.icon} /><Text style={styles.subText}>Edit your profile</Text></TouchableOpacity>
          <TouchableOpacity style={styles.options} onPress={handleYourPosts}><Ionicons name="checkbox" style={styles.icon} /><Text style={styles.subText}>Your posts</Text></TouchableOpacity>
          <TouchableOpacity style={styles.options} onPress={handleSavedPosts}><Ionicons name="bookmark" style={styles.icon} /><Text style={styles.subText}>Saved items</Text></TouchableOpacity>
          <TouchableOpacity style={styles.options} onPress={handleSettings}><Ionicons name="settings" style={styles.icon} /><Text style={styles.subText}>Settings</Text></TouchableOpacity>
          <TouchableOpacity style={styles.options} onPress={handlePrivacy}><Ionicons name="lock-closed" style={styles.icon} /><Text style={styles.subText}>Privacy & policy</Text></TouchableOpacity>
          <TouchableOpacity style={styles.options} onPress={handleLogout}><Ionicons name="log-out" style={styles.icon} /><Text style={styles.subText}>Logout</Text></TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
{/* <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.titleText}>Text</Text>
        </View>
        <View style={styles.itemContainer}>
            
        </View>
    </SafeAreaView> */}