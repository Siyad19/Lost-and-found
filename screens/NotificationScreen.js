import { View, Text , TouchableOpacity} from 'react-native'
import React from 'react'
import styles from '../styles/NotificationStyle'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'


export default function NotificationScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name='chevron-back' style={styles.headerIcons} /></TouchableOpacity>
            <Text style={styles.titleText}>Notifications</Text>
        </View>
        <View style={styles.itemContainer}>
            
        </View> 
    </SafeAreaView> 
  )
}