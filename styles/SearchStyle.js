import { StyleSheet } from "react-native";
import { widthPercentageToDP as widthScale, heightPercentageToDP as heightScale } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'space-between'
        backgroundColor:'#000'
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
    itemContainer: {
        //backgroundColor:'grey',
        width: widthScale(90),
        height: heightScale(80),
        alignItems: 'center',
    },
    titleText: {
        fontSize: widthScale(5),
        fontFamily: 'OpenSans',
        fontWeight: '700',
        color: '#fff',
    },
    Search: {
        // backgroundColor:'grey',
        width: widthScale(90),
        height: heightScale(8),
        marginBottom: heightScale(1),
        justifyContent: 'center'
    },
    input: {
        width: widthScale('90%'),
        height: heightScale('7%'),
        paddingLeft: widthScale(4),
        borderRadius: widthScale(2),
        fontSize: widthScale(4.5),
        backgroundColor:'#333446',
        color:'#fff'
    },
    searchIcon: {
        position: 'absolute',
        left: widthScale(78),
        top: widthScale(3.5),
        fontSize: widthScale(7),
        color:'#7F8CAA'
    },
    categories: {
        //backgroundColor:'grey',
        width: widthScale(90),
        height: heightScale(20),
        marginTop: heightScale(2),
    },
    categoryItem: {
        alignItems: "center",
        padding: widthScale(3),
        borderRadius: widthScale(4),
        width: widthScale(15),
        borderWidth: widthScale(0.1),
        margin: widthScale(1.5),
        borderColor:'#fff'
    },
    subText: {
        fontSize: widthScale(4.5),
        fontFamily: 'OpenSans',
        fontWeight: '700',
        color:'#fff'
    },
    foundItems: {
        // backgroundColor:'grey',
        
        flex: 1,
        marginTop: heightScale(1),
        paddingBottom:heightScale(6),
        width:widthScale('88%')
    },
    // hasSearch: {
    //     paddingBottom: heightScale(0),
    // },
    // noSearch: {
    //     paddingBottom: heightScale(0),
    // },
    item: {
         width: widthScale('88%'),
        height:heightScale('10.5%'),
        padding: widthScale(2.5),
        borderRadius: widthScale(3),
        marginBottom: heightScale(1),
        backgroundColor:'#333446',
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    itemText: {
        fontSize: widthScale(4.5),
        fontWeight: "bold",
        color:'#fff'
    },
    image: {
       width: widthScale(16),
        height: heightScale(8),
        // backgroundColor:'grey',
        marginRight: widthScale(2),
        borderRadius: widthScale(2)
    },
    itemInfo: {
        width: widthScale(45),
        // backgroundColor:'grey',
        justifyContent:'center'
    },
    
    statusContainer: {
        // backgroundColor: 'grey',
        justifyContent: 'center'
    },
    statusText: {
        color: '#ffffff',
        fontWeight: 'bold',
        width: widthScale(15),
        textAlign:'center'
    }
})

export default styles;