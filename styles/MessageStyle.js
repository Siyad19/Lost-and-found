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
        height: heightScale(8),
        alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'row'
    },
    headerIcons: {
        fontSize: widthScale(7),
        color:'#7F8CAA'
    },
    itemContainer: {
        flex:1,
        width: widthScale(90),
        height: heightScale(75),
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
        color:'#7F8CAA',
        fontWeight: '700',
        fontSize: widthScale(4)
    },
    inputContainer: {
        width: widthScale(95),
        height: heightScale(7),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // backgroundColor:'#000',
        alignItems:'center'
    },
    input: {
        width: widthScale(72),
        height: heightScale(6),
        backgroundColor: '#333446',
        borderRadius: widthScale(2),
        paddingLeft: widthScale(3)
    },
    sendBtn: {
        height: heightScale(6),
        width: widthScale(16),
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: widthScale(0.2),
        borderRadius: widthScale(3),
    },
    messageBox: {
        padding: widthScale(4),
        borderRadius: widthScale(3),
        marginVertical: heightScale(0.6),
        maxWidth: "80%",
    },
    senderBox: {
        backgroundColor: "#007AFF", // Blue for sender
        alignSelf: "flex-end",
        color:'#fff'
    },
    receiverBox: {
        backgroundColor: "#fff", // Gray for receiver
        alignSelf: "flex-start",
    },
    ProfileImg: {
        width: widthScale(10),
        height: heightScale(4.5),
        marginRight: widthScale(2),
        marginLeft: widthScale(4)
    },
    SendIcon: {
        fontSize: widthScale(6),
        color:'#7F8CAA',
    }

});

export default styles;