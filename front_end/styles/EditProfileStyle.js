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
        justifyContent: 'space-between',
        flexDirection: 'row'

    },
    headerIcons: {
        fontSize: widthScale(7),
    },
    backBtn: {
        fontSize: widthScale(7),
        // position: 'absolute',
        // right: widthScale(25),
        // top: heightScale(-1.5),
        color:'#7F8CAA'
    },
    confirmBtn: {
        fontSize: widthScale(7.5),
        color:'#7F8CAA'
    },
    itemContainer: {
        // backgroundColor:'grey',
        // flex:1,
        width: widthScale(90),
        height: heightScale(60),
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    titleText: {
        fontSize: widthScale(5),
        fontFamily: 'OpenSans',
        fontWeight: '700',
        textAlign: 'center',
        color:'#fff'
    },
    subText: {
        fontSize: widthScale(3.5),
        fontFamily: 'OpenSans',
        fontWeight: '700',
    },
    profile: {
        // backgroundColor:'grey',
        width: widthScale(90),
        height: heightScale(18),
        justifyContent: 'center',
        alignItems: 'center',
    },
    ProfileImg: {
        // backgroundColor:'grey',
        width: widthScale(35.8),
        height: heightScale(17),
        borderColor: "#000",
        borderWidth: widthScale(0.4),
        borderRadius: widthScale(100),
        padding: widthScale(1),
    },
    input: {
        width: widthScale(75),
        height: heightScale(7),
        paddingLeft: widthScale(4),
        borderRadius: widthScale(2),
        fontWeight:'500',
        backgroundColor: '#333446',
    },
    editBtn: {
        backgroundColor: '#333446',
        width: 40,
        height: 40,
        borderRadius: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: heightScale(14),
        right: widthScale(30),
        borderWidth: 2,
        borderColor: '#fff'
    },
    editIcon: {
        fontSize: widthScale(4),
        color: '#fff'
    },
    button: {
        width: widthScale(75),
        height: heightScale(7),
        borderWidth: widthScale(0.4),
        marginTop: heightScale(1),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: widthScale(2),
        backgroundColor: '#4024deff',
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },
     btnText: {
        color: 'blue',
        fontWeight: '400',
        fontSize: widthScale(4),
        fontStyle:'italic'
    },


    });

export default styles;