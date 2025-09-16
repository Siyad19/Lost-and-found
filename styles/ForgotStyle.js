import { StyleSheet } from "react-native";
import { widthPercentageToDP as widthScale, heightPercentageToDP as heightScale } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#000'
   },
   header: {
      //backgroundColor:'grey',
      width: widthScale(90),
      height: heightScale(15),
      alignItems: 'center',
      justifyContent: 'center'
   },
   itemContainer: {
      // backgroundColor:'grey',
      width: widthScale(90),
      height: heightScale(75),
      alignItems: 'center'
   },
   titleText: {
      fontSize: widthScale(5),
      fontFamily: 'OpenSans',
      fontWeight: '700',
      color: '#fff',
   },
   input: {
      width: widthScale(75),
      height: heightScale(7),
      marginTop: widthScale(8),
      paddingLeft: widthScale(4),
      borderRadius: widthScale(2),
      backgroundColor:'#333446',
      color:'#fff',
      marginBottom:heightScale('4%')
   },
   button: {
      width: widthScale(75),
      height: heightScale(7),
      borderWidth: widthScale(0.4),
      marginTop: widthScale(8),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: widthScale(2),
      backgroundColor: '#000000'
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
   otpInput: {
      width: widthScale(75),
      height: heightScale(7),
      marginTop: widthScale(8),
      borderRadius: widthScale(2),
      color: '#fff',
      marginBottom: heightScale('4%'),
      alignItems: 'center',
      justifyContent: 'space-between',
      // backgroundColor:'grey',
   },
   pinCodeText: {
      color: '#ffffff',
   },
   pinCodeContainer: {
      borderColor: '#333446',
      backgroundColor: '#333446',
   }
});

export default styles;

//