import { StyleSheet } from "react-native";
import { widthPercentageToDP as widthScale, heightPercentageToDP as heightScale } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#000'
        // justifyContent: 'space-between'
    },
    header: {
        // backgroundColor:'grey',
        width: widthScale(92),
        height: heightScale(8),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: heightScale(1)
    },
    itemContainer: {
        //backgroundColor:'grey',
        width: widthScale(100),
        alignItems: 'center',
        flex:1
    },
    itemScroll: {
        width: widthScale(90),
        height: heightScale(80),
    },
    titleText: {
        fontSize: widthScale(5),
        fontFamily: 'OpenSans',
        fontWeight: '700',
        color:'#ffffff',
    },
    Search: {
        // backgroundColor:'grey',
        width: widthScale(90),
        height: heightScale(8),
        marginBottom: heightScale(1),
        justifyContent: 'center'
    },
    input: {
        width: widthScale(90),
        height: heightScale(6),
        borderWidth: widthScale(0.4),
        paddingLeft: widthScale(4),
        borderRadius: widthScale(2),
        fontSize: widthScale(4),
        marginTop: heightScale(1),
        backgroundColor:'#333446',
    },
    inputDes: {
        width: widthScale(90),
        height: heightScale(10),
        borderWidth: widthScale(0.4),
        paddingLeft: widthScale(4),
        borderRadius: widthScale(2),
        fontSize: widthScale(4),
        paddingBottom: heightScale(3),
        backgroundColor:'#333446',
        marginTop: heightScale(1)
    },
    button: {
        width: widthScale(80),
        height: heightScale(6),
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
        fontSize: widthScale(4),
        color:'#ffffff',
    },
    backBtn:{
        fontSize:widthScale(6),
        position:'absolute',
        right:widthScale(30),
        top:heightScale(-1.5),
        color:'#7F8CAA',
    },
    statusContainer: {
        width: widthScale(90),
        height: heightScale(6),
        flexDirection: 'row',
        backgroundColor: '#333446',
        justifyContent: "space-evenly",
        alignItems: 'center',
        borderRadius: widthScale(3),
        borderWidth: widthScale(0.3),
        marginTop: heightScale(1)
    },
    statusBtn: {
        width: widthScale(43),
        height: heightScale(5),
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: widthScale(3)
    },
    statusBtnText: {
        fontSize: widthScale(4),
        fontWeight: "bold",
        color:'#ffffff',
    },
    dropdown: {
        backgroundColor:'#333446',
        marginTop:heightScale(1),
    },
    dropdownText: {
        fontSize: widthScale(4),
        color:'#fff',
        fontWeight:'500'
    },
    label: {
        fontSize: widthScale(4),
        fontWeight: "bold",
        marginTop: heightScale(3),
        color:'#ffffff',
    },
    map: {
        width: widthScale(90),
        height: heightScale(25),
        marginTop: heightScale(1),
        borderRadius: widthScale(3)
    },
    uploadBox: {
        width: widthScale(90),
        height: heightScale(20),
        borderRadius: widthScale(3),
        marginTop: heightScale(1),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#333446',
        overflow: "hidden",
        marginBottom:heightScale('3%'),
        
    },
    addText: {
        fontSize: widthScale(3),
        color: "#555",
        color:'#ffffff',
        paddingTop:heightScale('5%')
    },
    uploadIcon:{
        fontSize:widthScale('10%'),
        color:'#7F8CAA',
        position:'absolute',
        top:heightScale('95%'),
        left:widthScale('40%'),
        zIndex:1
    },
    thumbnail: {
        width: widthScale(90),
        height: heightScale(20),
        resizeMode: "cover",
    },

})

export default styles;