import { StyleSheet } from "react-native";
import { widthPercentageToDP as widthScale, heightPercentageToDP as heightScale } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        //  backgroundColor:'grey',
        width: widthScale(100),
        height: heightScale(15),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        // marginBottom: heightScale(1)
        paddingHorizontal: widthScale('5%')
    },
    headerIcons: {
        fontSize: widthScale(7),
        color: '#7F8CAA'
    },
    titleText: {
        fontSize: widthScale(5),
        fontFamily: 'OpenSans',
        fontWeight: '700',
        color: '#fff'
    },
    imageContainer: {
        flex: 1,
        borderRadius: widthScale(4),
        // backgroundColor: 'grey',
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        zIndex: 1,
        position: 'absolute',
        bottom: heightScale('45%'),
    },
    image: {
        width: widthScale('90%'),
        height: heightScale('40%'),
        borderRadius: widthScale(4),
        // backgroundColor: 'grey',

    },
    itemDetails: {
        backgroundColor: '#333446',
        borderTopRightRadius: widthScale('10%'),
        borderTopLeftRadius: widthScale('10%'),
        alignItems: 'center',
        marginTop: heightScale('30%'),
        flex: 1,
        paddingTop: heightScale('10%'),
    },
    itemName: {
        // backgroundColor: 'grey',
        alignItems: 'center',
        height: heightScale(12),
        width: widthScale(80),
        justifyContent: 'space-evenly',
        
    },
    itemNameText: {
        fontSize: widthScale(6),
        fontWeight: 'bold',
        color: '#fff',
        // bottom: heightScale(8)
    },
    descriptionText: {
        fontSize: widthScale(4),
        color: '#fff',
        // bottom: heightScale(8)
    },
    itemInfo: {
        flexDirection: 'row',
        // backgroundColor:'red',
        width: widthScale('90%'),
        height: heightScale('14%'),
        justifyContent: 'space-evenly',
        alignItems: 'center',
        
    },
    infoText: {
        fontSize: widthScale(3.5),
        fontWeight: '700',
        color: '#fff',
    },
    location: {
        width: widthScale('88%'),
        height: heightScale('8%'),
        backgroundColor: '#212121ff',
        borderRadius: widthScale('3%'),
        alignItems: 'center',
        justifyContent:'center',
        flexDirection:'row',
    },
    date: {
        width: widthScale('42%'),
        height: heightScale('12%'),
        backgroundColor: '#212121ff',
        borderRadius: widthScale('3%'),
        padding: widthScale('2%'),
        justifyContent:'space-evenly',
        alignItems: 'center',  
    },
    status: {
        width: widthScale('42%'),
        height: heightScale('12%'),
        backgroundColor: '#212121ff',
        borderRadius: widthScale('3%'),
        padding: widthScale('2%'),
        justifyContent:'space-evenly',
        alignItems: 'center',
    },
    infoIcon: {
        fontSize: widthScale('8%'),
        color:'#7F8CAA'
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems:'center',
        width: widthScale(90),
        height: heightScale(8), 
    },
    // button: {
    //     width: widthScale(42),
    //     height: heightScale(7),
    //     borderWidth: widthScale(0.4),
    //     marginTop: widthScale(4),
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     borderRadius: widthScale(2),
    //     backgroundColor: '#000000',
    //     elevation: 3,
    //     shadowColor: "#000",
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.4,
    //     shadowRadius: 4,
    // },
    // btnText: {
    //     color: '#ffffff',
    //     fontWeight: '700',
    //     fontSize: widthScale(4),

    // },

})

export default styles;