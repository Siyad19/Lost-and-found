import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ForgotScreen from './screens/ForgotScreen';
import ResetPassSrceen from './screens/ResetPassScreen';
import LocationScreen from './screens/LocationScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import BottomNav from './components/BottomNav';
import SplashScreen from './screens/SplashScreen';
import { LocationProvider } from "./context/LocationContext";
import ItemScreen from './screens/ItemScreen';
import LostandfoundNav from './components/LostandfoundNav';
import LostScreen from './screens/LostScreen';
import FoundScreen from './screens/FoundScreen';
import AddScreen from './screens/AddScreen';
import OtpScreen from './screens/OtpScreen';
import MessageScreen from './screens/MessageScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import SettingsScreen from './screens/SettingsScreen';
import YourPostScreen from './screens/YourPostScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import NotificationScreen from './screens/NotificationScreen';
import ChooseLocationScreen from './screens/ChooseLocationScreen';
import SavedPostScreen from './screens/SavedPostScreen';
import GetStartedScreen from './screens/GetStartedScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <LocationProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="GetStarted" component={GetStartedScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Forgot" component={ForgotScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Otp" component={OtpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Reset" component={ResetPassSrceen} options={{ headerShown: false }} />
          <Stack.Screen name="Location" component={LocationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Chats" component={ChatScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="NavBar" component={BottomNav} options={{ headerShown: false, gestureEnabled: false, headerLeft: null }} />
          <Stack.Screen name="Item" component={ItemScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LostAndFound" component={LostandfoundNav} options={{ headerShown: false }} />
          <Stack.Screen name="LostItem" component={LostScreen} options={{ headerShown: false }} />
          <Stack.Screen name="FoundItem" component={FoundScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddItem" component={AddScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Message" component={MessageScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="YourPost" component={YourPostScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ headerShown: false }} />
          <Stack.Screen name="User" component={UserProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ChooseLocation" component={ChooseLocationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Saved" component={SavedPostScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </LocationProvider>
  );
}
