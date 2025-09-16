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
       // backgroundColor:'grey',
        width: widthScale(90),
        height: heightScale(8),
        alignItems: 'center',
        // justifyContent: 'space-between',
        flexDirection: 'row'
    },
    headerIcons: {
        fontSize: widthScale(7),
        color:'#7F8CAA'
    },
    backBtn: {
        fontSize: widthScale(7),
        position: 'absolute',
        right: widthScale(25),
        top: heightScale(-1.5),
        color:'#7F8CAA'
    },
    
    itemContainer: {
        //backgroundColor:'grey',
        width: widthScale(90),
        height: heightScale(80),
        alignItems:"center",
        justifyContent:'space-between'
    },
    titleText: {
        fontSize: widthScale(5),
        fontFamily: 'OpenSans',
        fontWeight: '700',
        textAlign: 'center',
        color:'#fff'
        
    },
    subText: {
        fontSize: widthScale(4.5),
        fontFamily: 'OpenSans',
        fontWeight: '500',
    },
    profile: {
        //backgroundColor:'grey',
        width: widthScale(90),
        height: heightScale(25),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: heightScale(5)
    },
    ProfileImg: {
        // backgroundColor:'grey',
        width: widthScale(35.8),
        height: heightScale(17),
        borderColor: "#000",
        borderWidth: widthScale(0.4),
        borderRadius: widthScale(100),
        padding: widthScale(1),
        marginBottom: heightScale(2)
    },
    button: {
        width: widthScale(88),
        height: heightScale(7),
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
    icon:{
        fontSize:widthScale(8)
    },
    userInfo:{
        width: widthScale(80),
        height: heightScale(30),
        // backgroundColor:'grey'
    },
    info:{
        width: widthScale(80),
        height: heightScale(8),
        textAlign:'center',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:widthScale(8)
    },
    loading:{
        justifyContent:'center',
        alignItems:'center'
    }


});

export default styles;