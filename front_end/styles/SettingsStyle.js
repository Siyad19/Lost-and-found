import { StyleSheet } from "react-native";
import { widthPercentageToDP as widthScale, heightPercentageToDP as heightScale } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#000'
    },
    header: {
        // backgroundColor:'grey',
        width: widthScale(92),
        height: heightScale(8),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    headerIcons: {
        fontSize: widthScale(7),
        color:'#7F8CAA'
    },
    backBtn:{
        fontSize:widthScale(7),
        position:'absolute',
        right:widthScale(30),
        top:heightScale(-1.5),
        color:'#7F8CAA'
    },
    itemContainer: {
        // backgroundColor:'grey',
        width: widthScale(90),
        height: heightScale(70),
    },
    titleText: {
        fontSize: widthScale(5),
        fontFamily: 'OpenSans',
        fontWeight: '700',
        textAlign:'center',
        color:'#fff'
    },
    notification:{
        // backgroundColor: "grey",
        width: widthScale(90),
        height: heightScale(10),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:widthScale(4)
    },
    notificationIcon:{
        fontSize:widthScale(7), 
        color:'#7F8CAA'
    },
    notificationText:{
        justifyContent:'center',
        textAlign:'center',
        fontSize:widthScale(4),
        fontWeight:'600',
        color:'#fff'
    }
   

});

export default styles;