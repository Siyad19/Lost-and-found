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
    },
    backBtn: {
        fontSize: widthScale(7),
        position: 'absolute',
        right: widthScale(25),
        top: heightScale(-1.5),
        color:'#7F8CAA'
    },
    itemContainer: {
        // backgroundColor:'grey',
        width: widthScale(90),
        height: heightScale(80),
        flex:1
    },
    titleText: {
        fontSize: widthScale(5),
        fontFamily: 'OpenSans',
        fontWeight: '700',
        textAlign: 'center',
        color:'#ffffff',
    },
    subText: {
        fontSize: widthScale(3.5),
        fontFamily: 'OpenSans',
        fontWeight: '700',
        color:'#ffffff',
    },
    postItem: {
        width: widthScale(90),
        height: heightScale(13),
        flexDirection:'row',
        backgroundColor:'#333446',
        borderRadius:widthScale(2),
        padding: widthScale(2),
        marginBottom:widthScale(2),
        
    },
    image: {
        width:widthScale(16),
        height: heightScale(7.5),
        borderRadius: widthScale(2),
        marginRight: widthScale(4),
        // backgroundColor:'#808080'
    },
    status:{
        // backgroundColor:'grey'
    },
    statusText:{
        fontSize:widthScale(3),
        fontWeight:'700',
        color:'#ffffff',
        padding:widthScale(1),
        borderRadius:widthScale(1),
        width:widthScale(16),
        textAlign:'center'
    },
    itemInfo:{
        width:widthScale(50),
        // backgroundColor:'grey',
    },
    markAsReturn:{
        position:'absolute',
        top:heightScale(9),
        left:widthScale(2),
        width:widthScale(85),
        height:heightScale(3),
        padding:widthScale(1),
        borderRadius:widthScale(1),
        justifyContent:'center'
    },
    returnText:{
        fontSize:widthScale(3),
        fontWeight:'700',
        color:'#ffffff',
        textAlign:'center'
    },
     noItems: {
        flex:1,
        alignItems:'center',
        backgroundColor:'#000'
    },
    noItemsText: {
        fontSize: widthScale(3.5),
        fontWeight: "bold",
        color: "#fff",
        position:'absolute',
        top:heightScale('50%')
    }


});

export default styles;