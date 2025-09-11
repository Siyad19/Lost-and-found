import { StyleSheet } from "react-native";
import { widthPercentageToDP as widthScale, heightPercentageToDP as heightScale } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'space-between'
        backgroundColor: '#000'
    },
    header: {
        // backgroundColor:'grey',
        width: widthScale(92),
        height: heightScale(6),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: heightScale(1)
    },
    backBtn: {
        fontSize: widthScale(7),
        position: 'absolute',
        right: widthScale(20),
        top: heightScale(-1.5),
        color: '#7F8CAA'
    },
    itemContainer: {
        //backgroundColor:'grey',
        width: widthScale(90),
        height: heightScale(80),
    },
    titleText: {
        fontSize: widthScale(5),
        fontFamily: 'OpenSans',
        fontWeight: '700',
        color: '#fff',
    },
    card: {
        backgroundColor: '#333446',
        width: widthScale(40),
        height: heightScale(24),
        margin: widthScale(2),
        padding: widthScale(1),
        borderRadius: widthScale(2),
        alignItems: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    image: {
        width: widthScale(38),
        height: heightScale(16),
        borderRadius: widthScale(2),
        marginBottom: heightScale(1)
    },
    itemName: {
        fontSize: widthScale(3.5),
        fontWeight: "bold",
        color: "#fff"
    },
    itemDate: {
        fontSize: widthScale(3),
        fontWeight: "500",
        color: "#fff"
    },
    itemStatus: {
        fontSize: widthScale(3),
        fontWeight: "500",
    },
     noSavedItems: {
        flex:1,
        alignItems:'center',
        backgroundColor:'#000'
    },
    noSavedItemsText: {
        fontSize: widthScale(3.5),
        fontWeight: "bold",
        color: "#fff",
        position:'absolute',
        top:heightScale('50%')
    }
});

export default styles;