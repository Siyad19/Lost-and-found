import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../styles/PrivacyStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function PrivacyScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} ><Ionicons name="chevron-back-sharp" style={styles.backBtn}></Ionicons></TouchableOpacity>
                <Text style={styles.titleText}>Privacy & policy</Text>
            </View>
            <ScrollView style={styles.itemContainer}>
                <Text>
                    <Text style={styles.subText}>Privacy Policy</Text>
<Text style={styles.text}>{`\nLast Updated: [Insert Date]\nAt [App Name], your privacy is important to us. This 
policy explains how we collect and use your information.\nWhat We Collect:
        Personal Info: When you sign up, we collect your 
        name, email, password, and location.
        Item Info: We collect photos and details of lost and 
        found items you upload.
        Device Info: We may collect info about your device 
        for app improvements.
        Location: With your permission, we collect your
        location to show relevant items nearby.
How We Use Your Info:
        To help match lost and found items.
        To improve the app and provide customer support.
        To send notifications about item matches.
Security:
We take steps to protect your data, but no method is 
100% secure. We can't guarantee complete security.
Third-Party Services:
We may use services like Google Cloud Vision for 
image matching. These services have their own privacy
policies.
Your Rights:
You can view, update, or delete your personal information at any time by contacting us.
Cookies:
We may use cookies to improve your app experience. You can control this through your device settings.
Changes to the Policy:
We may update this policy occasionally. Check for updates in the app.\n\n`}</Text>

<Text style={styles.subText}>Terms of Use</Text>
<Text style={styles.text}>{`\nLast Updated: [Insert Date]
By using [App Name], you agree to these terms:
Using the App:
        You must be at least 18 years old or have permission 
        from a parent.
        You’re responsible for your account and any content 
        you upload.
Your Content:
        You own the content you upload but give us 
        permission to use it in the app.
        Don’t upload anything that violates others’ rights.
Liability:
        We’re not responsible for the accuracy of the 
        information you upload or for any issues arising from 
        using the app.
Account Suspension:
        We can suspend or delete your account if you break 
        the rules.
Governing Law:
        These terms are governed by the laws of [your 
        country/jurisdiction].
Contact Us:
        For questions, contact us at [email address].`}</Text></Text>
            </ScrollView>
        </SafeAreaView>
    )
}