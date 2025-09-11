import { View, Text, Image } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import styles from '../styles/GetStartedStyle'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomBtn from '../components/ButtonStyle'
import PagerView from 'react-native-pager-view';

export default function GetStartedScreen({navigation}) {

    const pagerRef = useRef(null);
    const [page, setPage] = useState(0);
    const totalPages = 3;

    // Auto-scroll effect
    useEffect(() => {
        const interval = setInterval(() => {
            const nextPage = (page + 1) % totalPages;
            pagerRef.current?.setPage(nextPage);
            setPage(nextPage);
        }, 3000); // every 3s
        return () => clearInterval(interval);
    }, [page]);

    return (
        <SafeAreaView style={styles.container}>
            {/* <Text style={styles.titleText}>GetStarted</Text> */}
            <View style={styles.itemContainer}>
                <Image source={require("../assets/man-shrugging.png")} resizeMode='contain' style={styles.image} />
                {/* <View style={styles.description}>
            <Text style={styles.title}>Find What’s Lost, Return What’s Found.</Text>
            <Text style={styles.subText}>Connect with people around you to report lost items, share found ones, and reunite things with their owners.</Text>
        </View> */}
                <PagerView style={styles.description} initialPage={0}
                    ref={pagerRef}
                    onPageSelected={(e) => setPage(e.nativeEvent.position)}>
                    <View style={styles.slide} key="1">
                        <Text style={styles.title}>Find What’s Lost, Return What’s Found.</Text>
                        <Text style={styles.subText}>Connect with people around you to report lost items, share found ones, and reunite things with their owners.</Text>
                    </View>
                    <View style={styles.slide} key="2">
                        <Text style={styles.title}>Search & Share Easily.</Text>
                        <Text style={styles.subText}>Look for your lost items or post what you’ve found in just a few taps—fast, simple, and effective.</Text>
                    </View>
                    <View style={styles.slide} key="3">
                        <Text style={styles.title}>Together, We Bring Things Back.</Text>
                        <Text style={styles.subText}>Join a helpful community where people support each other by returning what’s lost and sharing what’s found.</Text>
                    </View>

                </PagerView>
                {/* Pagination Dots */}
                <View style={styles.pagination}>
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.dot,
                                { opacity: page === i ? 1 : 0.5, backgroundColor: page === i ? "blue" : "#fff" },
                            ]}
                        />
                    ))}
                </View>
                <CustomBtn title='Get Started' onPress={() => navigation.navigate('Login')}/>
            </View>
        </SafeAreaView>
    )
}