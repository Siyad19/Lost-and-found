import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Image, StyleSheet } from "react-native";
import LostScreen from "../screens/LostScreen";
import FoundScreen from "../screens/FoundScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();

export default function LostAndFoundNav() {
  return (
    <SafeAreaView style={styles.container}>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // tabBarIcon: ({ focused }) => {
        //   let iconSource;

        //   if (route.name === "Lost") {
        //     iconSource = focused
        //       ? require("../assets/lost.png")
        //       : require("../assets/lost.png");
        //   } else if (route.name === "Found") {
        //     iconSource = focused
        //       ? require("../assets/found.png")
        //       : require("../assets/found.png");
        //   }

        //   return (
        //     <Image
        //       source={iconSource}
        //       style={{ width: 20, height: 20 }}
        //       resizeMode="contain"
        //     />
        //   );
        // },
        tabBarShowIcon: true,
        tabBarLabelStyle: { fontSize: 18, fontWeight:'700' },
        tabBarIndicatorStyle: { backgroundColor: "#fff" },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#000000" },
      })}
    >
      <Tab.Screen name="Lost" component={LostScreen} />
      <Tab.Screen name="Found" component={FoundScreen} />
    </Tab.Navigator>
    
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});