import { StyleSheet } from "react-native";
import { widthPercentageToDP as widthScale, heightPercentageToDP as heightScale } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'space-between',
        backgroundColor: '#000'
    },
    header: {
        //backgroundColor:'grey',
        width: widthScale(92),
        height: heightScale(6),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    headerIcons: {
        fontSize: widthScale(7),
    },
    itemContainer: {
        // backgroundColor:'grey',
        width: widthScale(90),
        height: heightScale(80),
        // alignItems: 'center',

    },
    titleText: {
        fontSize: widthScale(5),
        fontFamily: 'OpenSans',
        fontWeight: '700',
        textAlign: 'center',
        color: '#fff'
    },

    subText: {
        fontSize: widthScale(4.5),
        fontFamily: 'OpenSans',
        fontWeight: '500',
        textAlign: 'left',
        margin: widthScale(4),
        marginLeft: widthScale(8),
        // justifyContent:'center',
        color: '#fff'
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
        color: '#ffffff',
        fontWeight: '700',
        fontSize: widthScale(4)
    },
    loading: {
        position: 'relative',
        top: heightScale(5)
    },
    profile: {
        // backgroundColor:'grey',
        width: widthScale(90),
        height: heightScale(28),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: heightScale(2),
    },
    ProfileImgContainer: {
        width: 152,
        height: 154,
        borderRadius: 100,
        marginBottom: heightScale(2),
        justifyContent:'center',
        alignItems:'center'
    },
    ProfileImg: {
        // backgroundColor:'grey',
        width: 150,
        height: 148,
        borderRadius: 100,   
    },
    optionList: {
        //backgroundColor:'grey',
        width: widthScale(90),
        height: heightScale(50),
    },
    options: {
        // backgroundColor:'grey',
        margin: widthScale(2),
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: widthScale(10)
    },
    icon: {
        fontSize: widthScale(8),
        color: '#7F8CAA'
    }



});

export default styles;