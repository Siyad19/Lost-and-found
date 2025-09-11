import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import API_BASE_URL from '../config';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import styles from '../styles/UserProfileStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomBtn from '../components/ButtonStyle';
import { LinearGradient } from 'expo-linear-gradient';

const UserProfileScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/user/profile/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.log("Error fetching user:", error));
  }, []);

  if (!user) return <Text style={styles.loading}></Text>;

  const handleSendMessage = async () => {
    try {
      // Retrieve token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Authentication Error', 'User not logged in.');
        return;
      }

      // Send chat request to backend
      const response = await fetch(`${API_BASE_URL}/api/chats`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to create chat');
      }

      // Navigate to chat screen with chatId
      navigation.navigate('Message', { chatId: data._id });
    } catch (err) {
      console.error('Chat creation error:', err.message);
      Alert.alert('Error', err.message);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name='chevron-back' style={styles.headerIcons} /></TouchableOpacity>
        {/* <Text style={styles.titleText}>Text</Text> */}
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
          
          <Text style={styles.titleText}>{user.username}</Text>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.info}><Ionicons name='mail' style={styles.icon} /><Text style={styles.subText}>   {user.email}</Text></View>
          <View style={styles.info}><Ionicons name='call' style={styles.icon} /><Text style={styles.subText}>   {user.mobileNumber}</Text></View>
        </View>
        
        <CustomBtn title='Send a message' onPress={handleSendMessage}/>
      </View>
    </SafeAreaView>
  );
};

export default UserProfileScreen;

{/* <Text>Username: {user.username}</Text>
      <Text>Email: {user.email}</Text> */}