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
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom:heightScale(3)
    },
    backBtn:{
        fontSize:widthScale(7),
    },
    itemContainer: {
        // backgroundColor:'grey',
        width: widthScale(90),
        height: heightScale(95),
        alignItems: 'center',
        paddingTop:heightScale(3),
    },
    titleText: {
        fontSize: widthScale(5),
        fontFamily: 'OpenSans',
        fontWeight: '700'
    },
    row: {
        justifyContent: "space-between"
    },
    card: {
        backgroundColor:'#333446',
        width:widthScale(40),
        height:heightScale(22),
        margin:widthScale(2),
        padding:widthScale(1),
        borderRadius: widthScale(2),
        alignItems: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    image: {
        width:widthScale(38),
        height: heightScale(16),
        borderRadius: widthScale(2),
        marginBottom:heightScale(1)
    },
    name: {
        fontSize: widthScale(3.5),
        fontWeight: "bold",
        color: "#fff"
    },
    foundOn: {
        fontSize: widthScale(3),
        color: "#fff"
    },
    addBtn:{
        position:'absolute',
        backgroundColor:'#000000',
        width:70,
        height:70,
        top:heightScale(68),
        left:widthScale(78),
        borderRadius:100,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        justifyContent:'center',
        alignItems:'center'
    },
    addIcon:{
        color:'#ffffff',
        fontSize:widthScale(9),
        fontWeight:'bold'
    }
});

export default styles;