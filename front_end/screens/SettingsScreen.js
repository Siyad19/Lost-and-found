import { View, Text, TouchableOpacity, Switch } from 'react-native'
import React, { useState } from 'react'
import styles from '../styles/SettingsStyle'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

export default function SettingsScreen({ navigation}) {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} ><Ionicons name="chevron-back-sharp" style={styles.backBtn}></Ionicons></TouchableOpacity>
                <Text style={styles.titleText}>Settings</Text>
            </View>
            <View style={styles.itemContainer}>
                <View style={styles.notification} >
                    <Ionicons name={isEnabled ? "notifications-off" : "notifications"} style={styles.notificationIcon} />
                    <Text style={styles.notificationText}>Turn off notifications</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#a19ea2ff' }}
                        thumbColor={isEnabled ? '#ffffff' : '#00000'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}