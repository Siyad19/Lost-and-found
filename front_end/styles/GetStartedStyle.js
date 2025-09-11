import { StyleSheet } from "react-native";
import { SlideInDown } from "react-native-reanimated";
import { widthPercentageToDP as widthScale, heightPercentageToDP as heightScale } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000',
    },
    header: {
        //backgroundColor:'grey',
        width: widthScale(90),
        height: heightScale(15),
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemContainer: {
        //backgroundColor:'grey',
        width: widthScale(90),
        height: heightScale(90),
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    titleText: {
        fontSize: widthScale(5),
        fontFamily: 'OpenSans',
        fontWeight: '700',
        color: '#fff',
    },
    image: {
        width: widthScale(90),
        height: heightScale(50),
        //backgroundColor:'#ccc',
    },
    description: {
        // backgroundColor:'#ccc',
        width: widthScale(90),
        height: heightScale(20),
    },
    slide: {
        width: widthScale(90),
        height: heightScale(20),
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: widthScale(2)
    },
    title: {
        fontSize: widthScale(8),
        color: "#fff",
        fontWeight: '700',
        textAlign: 'center'
    },
    subText: {
        fontSize: widthScale(4),
        color: "#fff",
        textAlign: 'center',
        width: widthScale(80)
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom:heightScale(3)
    },
    dot: {
        width: widthScale(2),
        height: widthScale(2),
        borderRadius: widthScale(100),
        margin: widthScale(1.2),
    },
})
export default styles;
