import { StyleSheet } from "react-native";
import { widthPercentageToDP as widthScale, heightPercentageToDP as heightScale } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#000'
    },
    header: {
        //backgroundColor:'grey',
        width: widthScale(90),
        height: heightScale(8),
        alignItems: 'center',
        justifyContent: "space-between",
        flexDirection: 'row'
    },
    backBtn: {
        fontSize: widthScale(6),
        color:'#7F8CAA'
    },
    itemContainer: {
        // backgroundColor:'grey',
        width: widthScale(90),
        height: heightScale(60),
        alignItems: 'center'
    },
    titleText: {
        fontSize: widthScale(5),
        fontFamily: 'OpenSans',
        fontWeight: '700',
        color:'#fff'
    },
    description: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: heightScale(2)
    },
    subText: {
        fontSize: widthScale(4),
        fontFamily: 'OpenSans',
        fontWeight: '400'
    },
    button: {
        width: widthScale(75),
        height: heightScale(6),
        borderWidth: widthScale(0.4),
        marginTop: widthScale(8),
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
        height: heightScale(20),
        marginBottom: heightScale(5)

    },
    manualLocation: {
        flexDirection: 'row',
        justifyContent:'space-between',
        width:widthScale(74),
        alignItems:'center',
        marginTop:heightScale(2)
    }, 
    input: {
        width: widthScale(80),
        height: heightScale(6),
        paddingLeft: widthScale(4),
        borderRadius: widthScale(2),
        fontSize: widthScale(3),
        backgroundColor:'#333446',
        color:'#fff'
    },
    locations:{
        width:widthScale('80%'),
        height:heightScale('30%'),
    
    },
    locationText:{
        color:'#fff'
    }

});


export default styles;