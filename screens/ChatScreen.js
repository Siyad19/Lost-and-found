import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, Image } from 'react-native';
import React, { useState, useEffect, } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/ChatStyle';
import API_BASE_URL from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChatScreen({ navigation }) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  

  useEffect(() => {
    const initializeChat = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);  // Store token in state
        fetchChats(storedToken); // Call fetchChats after setting token
      } else {
        console.error("No token found, user may not be authenticated");
        setLoading(false);
      }
    };

    initializeChat();
  }, []);

  const fetchChats = async (authToken) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chats`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const data = await response.json();
    if (response.ok) {
      const userId = await AsyncStorage.getItem("userId");

      // ⬇️ Prepare chats with proper latest message and sort key
      const formattedChats = data.map((chat) => {
        const otherParticipant = Array.isArray(chat.participants)
          ? chat.participants.find(participant => participant._id !== userId)
          : null;

        // ✅ Find the most recent message
        const latestMessage = chat.messages?.reduce((latest, current) => {
          return new Date(current.createdAt) > new Date(latest?.createdAt || 0)
            ? current
            : latest;
        }, null);

        return {
          ...chat,
          profilePic: otherParticipant?.profilePic || require('../assets/man-user-circle-icon.png'),
          lastMessage: latestMessage?.content || "No messages yet",
          lastMessageDate: latestMessage?.createdAt
            ? new Date(latestMessage.createdAt).toLocaleDateString()
            : "",
          lastMessageTime: latestMessage
            ? new Date(latestMessage.createdAt).getTime()
            : 0, // use this for sorting
        };
      });

      // ✅ Sort by last message time (latest first)
      const sortedChats = formattedChats.sort((a, b) => b.lastMessageTime - a.lastMessageTime);

      setChats(sortedChats);
    } else { 
      console.error("Error fetching chats:", data.error);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setLoading(false);
  }
};

  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleText}>Chats</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : chats.length === 0 ? (
        <Text style={{ textAlign:'center',bottom:300}}>No chats found</Text>
      ) : (
        <FlatList
          data={chats}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) =>{
          
          return(
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Message", { chatId: item._id })}>
              <View>
                <Image style={styles.profilePic} source={item.profilePic}/>
              </View>
              <View style={styles.username}>
                <Text style={styles.text}>{item.username}</Text>
                <Text style={styles.lastMessage}>{item.lastMessage}</Text>
              </View>
              <View>
                <Text>{item.lastMessageDate}</Text>
              </View>
            </TouchableOpacity> 
          )
          }}
        />
      )}
    </SafeAreaView>
  );
}
