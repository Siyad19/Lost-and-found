import { StyleSheet } from "react-native";
import { widthPercentageToDP as widthScale, heightPercentageToDP as heightScale } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#000'
    },
    header: {
       // backgroundColor:'grey',
        width: widthScale('92%'),
        height: heightScale('6%'),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    headerIcons: {
        fontSize: widthScale(7),
        color:'#7F8CAA'
    },
    itemContainer: {
        // backgroundColor:'grey',
        width: widthScale(90),
        height: heightScale(85),
        alignItems: 'center'
    },
    titleText: {
        fontSize: widthScale(5),
        fontFamily: 'OpenSans',
        fontWeight: '700',
        color:'#fff'
    },
    greeting: {
        width: widthScale(80),
        height: heightScale(6),
        // backgroundColor:'grey',
        
    },
    description: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: heightScale(2),
        color:'#fff'
    },
    subText: {
        fontSize: widthScale(4),
        fontFamily: 'OpenSans',
        fontWeight: '700',
        textAlign: 'center',
        margin: widthScale(4),
        color:'#fff'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: widthScale(80),
        height: heightScale(8),
    },
    button: {
        width: widthScale(65),
        height: heightScale(7),
        borderWidth: widthScale(0.4),
        marginTop: heightScale(1),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: widthScale(2),
        backgroundColor: '#000000',
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,

    },
    btnText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: widthScale(4)
    },
    loading: {
        position: 'relative',
        top: heightScale(5)
    },
    icon: {
        //backgroundColor:'grey',
        width: widthScale(65),
        height: heightScale(30),
        marginBottom: heightScale(5),
        
    },
    swiper: {
        width: widthScale(100),
        height: heightScale(32),
        // backgroundColor:'grey',
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },
    image: {
        width: widthScale(88),
        height: heightScale(21),
        borderRadius: widthScale(4),
        // backgroundColor: 'grey'
    },
    caption: {
        zIndex: 1,
        fontSize: widthScale(3.5),
        fontWeight: 'bold',
        color: '#fff',
        // bottom: heightScale(8),
        
    },
    itemDescription: {
        zIndex: 1,
        fontSize: widthScale(3.2),
        color: '#fff',

        // bottom: heightScale(8)
    },
    itemDetails: {
        opacity: 0.7,
        backgroundColor: '#000',
        width: widthScale(88),
        height: heightScale(7),
        position: 'absolute',
        top: heightScale(14),
        paddingLeft: widthScale(3),
        paddingTop: heightScale(0.6),
        borderBottomLeftRadius: widthScale(4),
        borderBottomRightRadius: widthScale(4)
    },
    foundItems: {
       // backgroundColor: 'grey',
        // paddingBottom: heightScale(8),
        flex: 1,
        paddingBottom:heightScale('8%'),
        marginTop:heightScale('1%')
    },
    item: {
        width: widthScale('88%'),
        height:heightScale('10.5%'),
        padding: widthScale(2.5),
        borderRadius: widthScale(3),
        marginBottom: heightScale(1),
        backgroundColor:'#333446',
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    itemText: {
        fontSize: widthScale(4.5),
        fontWeight: "bold",
        color:'#fff'
    },
    imageOnPost: {
        width: widthScale(16),
        height: heightScale(8),
        // backgroundColor:'grey',
        marginRight: widthScale(2),
        borderRadius: widthScale(2)
    },
    itemInfo: {
        width: widthScale(45),
        // backgroundColor:'grey',
        justifyContent:'center'
    },
    statusContainer: {
        // backgroundColor: 'grey',
        justifyContent: 'center'
    },
    statusText: {
        fontWeight: 'bold',
        width: widthScale(15),
        textAlign: 'center',
    },
    noItemsText: {
        textAlign: 'center',
        color:'#fff'
    },
    subText1: {
        fontSize: widthScale(4),
        fontFamily: 'OpenSans',
        fontWeight: '800',
        marginLeft: widthScale(2),
        color:'#fff'
    },
    noRecentFound: {
        backgroundColor: "#fff",
        width: widthScale('80%'),
        height: heightScale('25%'),
        borderRadius: widthScale('4%'),
        justifyContent: 'center',
        marginLeft: widthScale(10),
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        
    },
    locationText:{
        color:'#fff',
        fontWeight:500,
        marginLeft:widthScale('1%')
    }


});

export default styles;