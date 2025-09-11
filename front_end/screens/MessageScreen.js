import React, { useEffect, useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Image, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "../config";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/MessageStyle";
import { Ionicons } from "@expo/vector-icons";
import CustomBtn from "../components/ButtonStyle";
 
export default function MessageScreen({ route, navigation }) {
  const { chatId } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState(null); // Store User ID
  const [chatUser, setChatUser] = useState(null); // The other user
  const [chatUsername, setChatUsername] = useState('');

  const flatListRef = useRef(null);
  const previousMessageCount = useRef(0);

  const API_URL = "https://lost-and-found-3i2f.onrender.com";

  useEffect(() => {
    let interval;
    const fetchTokenAndMessages = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedUserId = await AsyncStorage.getItem("userId");

        if (storedToken && storedUserId) {
          const trimmedUserId = storedUserId.trim();
          setToken(storedToken);
          setLoggedInUserId(trimmedUserId);

          // Initial fetch
          fetchMessages(storedToken);
          fetchChatUser(storedToken);

          // Set up polling every 2 seconds
          interval = setInterval(() => {
            fetchMessages(storedToken);
          }, 2000);

        } else {
          console.error("No token or user ID found");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error retrieving token or user ID:", error);
        setLoading(false);
      }
    };

    fetchTokenAndMessages();

    return () => {
      // Clear polling interval on unmount
      clearInterval(interval);
    };
  }, []);


  const fetchChatUser = async (authToken) => {
    try {
      const response = await fetch(`${API_URL}/api/chats/${chatId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const data = await response.json();

      if (response.ok) {
        setChatUsername(data.username);
      } else {
        console.error("Failed to fetch chat user:", data.error);
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };


  const fetchMessages = async (authToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/messages/${chatId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const text = await response.text();
      try {
        const data = JSON.parse(text);
        if (response.ok) {
          const newMessages = data;

          setMessages(newMessages); // Always update messages

          // Scroll only if new messages are added
          if (newMessages.length > previousMessageCount.current) {
            setTimeout(() => {
              flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
          }

          // Always update previous count
          previousMessageCount.current = newMessages.length;

        } else {
          console.error("Error fetching messages:", data.error);
        }
      } catch (jsonError) {
        console.error("Response is not JSON:", text);
      }
    } catch (error) {
      console.error("Network Error:", error);
    } finally {
      setLoading(false);
    }
  };


  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const storedToken = await AsyncStorage.getItem("token");
      if (!storedToken) {
        console.error("No token found");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          chatId,
          content: newMessage,
        }),
      });

      const text = await response.text();
      console.log("Raw Response:", text);

      try {
        const data = JSON.parse(text);
        if (response.ok) {
          setMessages([...messages, data]);

          setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }, 100);
          setNewMessage("");
        } else {
          console.error("Error sending message:", data.error);
        }
      } catch (error) {
        console.error("JSON Parse Error:", error, "Response Text:", text);
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? -35 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" style={styles.headerIcons} />
            </TouchableOpacity>
            <Image
              source={require("../assets/man-user-circle-icon.png")}
              style={styles.ProfileImg}
            />
            <Text style={styles.titleText}>{chatUsername || "Chat"}</Text>
          </View>

          {/* Chat messages */}
          <View style={styles.itemContainer}>
            {loading ? (
              <ActivityIndicator size="large" style={{flex:1, backgroundColor:'#000'}}/>
  
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                  const senderId = item.sender?._id || item.sender;
                  const isSender =
                    senderId?.toString() === loggedInUserId?.toString();

                  return (
                    <View
                      style={[
                        styles.messageBox,
                        isSender ? styles.senderBox : styles.receiverBox,
                      ]}
                    >
                      <Text>{item.content}</Text>
                    </View>
                  );
                }}
                onContentSizeChange={() =>
                  flatListRef.current?.scrollToEnd({ animated: true })
                }
                onLayout={() =>
                  flatListRef.current?.scrollToEnd({ animated: true })
                }
                keyboardShouldPersistTaps="handled"
              />
            )}
          </View>

          {/* Input */}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Type a message..."
              value={newMessage}
              onChangeText={setNewMessage}
              style={styles.input}
              placeholderTextColor='#7F8CAA'
            />
            {/* <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
              <Ionicons name="send" style={styles.SendIcon} />
            </TouchableOpacity> */}
            <CustomBtn title='Send' width="16" height="6"/>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );

}
