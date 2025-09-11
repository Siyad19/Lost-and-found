import { View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from '../styles/EditProfileStyle'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import API_BASE_URL from '../config'

export default function EditProfileScreen({ navigation }) {


  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');

        if (userId) {
          const response = await fetch(`${API_BASE_URL}/api/user/${userId}`);
          const data = await response.json();

          setUserData(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
      return <ActivityIndicator size="large" style={{flex:1, backgroundColor:'#000'}}/>
  }

  const handleUpdateProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');


      const response = await fetch(`${API_BASE_URL}/api/user/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
          email,
          mobileNumber: mobile,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        const updatedUser = result.user;
        await AsyncStorage.setItem('username', updatedUser.username);
        await AsyncStorage.setItem('email', updatedUser.email);
        await AsyncStorage.setItem('mobile', updatedUser.mobileNumber);
        alert('Profile updated successfully');
      } else {
        alert(result.error || 'Update failed');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Something went wrong');
    }
  };



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? -30 : 0} // You can adjust this
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-sharp" style={styles.backBtn} />
            </TouchableOpacity>
            <Text style={styles.titleText}>Edit profile</Text>
            <TouchableOpacity onPress={handleUpdateProfile}>
              <Ionicons name="checkmark-outline" style={styles.confirmBtn} />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.itemContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity style={styles.profile}>
              <Image source={require('../assets/man-user-circle-icon.png')} style={styles.ProfileImg} />
              <TouchableOpacity style={styles.editBtn}><Ionicons name='pencil' style={styles.editIcon} /></TouchableOpacity>
            </TouchableOpacity>
            <View style={styles.username}>
              <TextInput
                placeholder={userData.username || 'Username'}
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholderTextColor='#7F8CAA' />
            </View>
            <View style={styles.email}>
              <TextInput
                placeholder={userData.email || 'Email Address'}
                style={styles.input}
                placeholderTextColor='#7F8CAA'
                value={email}
                onChangeText={setEmail} />
            </View>
            <View style={styles.mobile}>
              <TextInput
                placeholder={userData.mobileNumber || 'Mobile Number'}
                keyboardType='numeric'
                style={styles.input}
                placeholderTextColor='#7F8CAA'
                value={mobile}
                onChangeText={setMobile}
              />
            </View>
            <View style={styles.changePass}>
              <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}><Text style={styles.btnText}>Do you want to change password?</Text></TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  )
}