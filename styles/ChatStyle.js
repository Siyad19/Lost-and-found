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
        width: widthScale(92),
        height: heightScale(6),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    headerIcons: {
        fontSize: widthScale(7),
    },
    itemContainer: {
        //backgroundColor:'grey',
        width: widthScale(90),
        height: heightScale(80),
        alignItems: 'center'
    },
    titleText: {
        fontSize: widthScale(5),
        fontFamily: 'OpenSans',
        fontWeight: '700',
        color:'#fff'
    },
    subText: {
        fontSize: widthScale(4),
        fontFamily: 'OpenSans',
        fontWeight: '700',
        textAlign:'center',
        margin:widthScale(4),
        color:'#fff'
    }, 
    button: {  
        width: widthScale(90),
        height: heightScale(10),
        marginTop: heightScale(1),
        alignItems: 'center',
        justifyContent: 'space-between',
        
        // backgroundColor: 'grey',
        flexDirection:'row',
        padding:widthScale(3)
    },
    text: {
        color: '#000000',
        fontWeight: '700',
        fontSize: widthScale(4),
        color:'#fff'
    },
    profilePic:{
        width:widthScale(15),
        height:heightScale(7),
        borderRadius:widthScale(100),
        // backgroundColor:'grey'
    },
    username:{
        width:widthScale(55),
        height:heightScale(5),
        // backgroundColor:'grey'
    },
    lastMessage:{
        color:'#fff'
    }

});

export default styles;