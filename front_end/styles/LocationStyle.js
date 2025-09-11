import { StyleSheet } from "react-native";
import { widthPercentageToDP as widthScale, heightPercentageToDP as heightScale } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor:'#000'
    },
    header: {
        //backgroundColor:'grey',
        width: widthScale('90%'),
        height: heightScale('8%'),
        alignItems: 'center',
        justifyContent: "space-between",
        flexDirection: 'row'
    },
    backBtn: {
        fontSize: widthScale('6%'),
        color:'#7F8CAA'
    },
    itemContainer: {
        // backgroundColor:'grey',
        width: widthScale('90%'),
        height: heightScale("75%"),
        alignItems: 'center'
    },
    titleText: {
        fontSize: widthScale('5%'),
        fontFamily: 'OpenSans',
        fontWeight: '700',
        color:'#fff'
    },
    description: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: heightScale('2%')
    },
    subText: {
        fontSize: widthScale('4%'),
        fontFamily: 'OpenSans',
        fontWeight: '400',
        color:'#fff'
    },
    loading: {
        position: 'relative',
        top: heightScale('5%')
    },
    icon: {
        //backgroundColor:'grey',
        width: widthScale('65%'),
        height: heightScale('20%'),
        marginBottom: heightScale('5%')

    },
    manualLocation: {
        flexDirection: 'row',
        justifyContent:'space-between',
        width:widthScale('74%'),
        alignItems:'center',
        
        marginTop:heightScale('2%')
    },
   
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        width: widthScale('62%'),
        padding: 10,
        borderRadius: 5,
    },
    manualBtn:{
        width: widthScale('75%'),
        height: heightScale("7%"),
        marginTop: widthScale('5%'),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row'
    },
    btn2Text:{
        fontWeight: '500',
        fontSize: widthScale('4%'),
        color:'#fff'
    },
    
});


export default styles;