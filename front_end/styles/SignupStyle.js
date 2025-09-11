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
      //backgroundColor:'grey',
      width: widthScale(90),
      height: heightScale(90),
      alignItems: 'center',
      justifyContent: 'center'
   },
   titleText: {
      fontSize: widthScale(5),
      fontFamily: 'OpenSans',
      fontWeight: '700',
      color: '#fff',
   },
   greet: {
      width: widthScale("75%"),
      height: heightScale('12%'),
      // backgroundColor:'#fff'
   },
   greetText: {
      fontSize: widthScale('8%'),
      fontWeight: '700',
      color: '#ffffff',
      fontStyle: 'italic'
   },
   input: {
      width: widthScale(75),
      height: heightScale(7),
      marginTop: heightScale(2),
      marginBottom: heightScale(2),
      paddingLeft: widthScale(4),
      borderRadius: widthScale(2),
      color: '#fff',
      backgroundColor: '#333446',
   },
   forgetPass: {
      width: widthScale(75),
      marginTop: widthScale(2)
   },
   button: {
      width: widthScale('75%'),
      height: heightScale('7%'),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: widthScale(0.2),
      borderColor: '#333446',
      borderRadius: widthScale('2%'),
      flexDirection: 'row'
   },
   btnText: {
      color: '#fff'
   },
    subText: {
      color: '#ffffff',
      marginVertical:heightScale(2)
   },
   googleIcon: {
      width: widthScale('6%'),
      marginRight: widthScale('2%')
   },
   signup: {
      marginTop: widthScale(8)
   },
   signupText: {
      color: '#fff',
   }
});

export default styles;