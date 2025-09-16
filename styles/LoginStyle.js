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
      backgroundColor:'grey',
      width: widthScale('90%'),
      height: heightScale('10%'),
      alignItems: 'center',
      justifyContent: 'center'
   },
   itemContainer: {
      //backgroundColor:'grey',
      width: widthScale('90%'),
      height: heightScale('90%'),
      alignItems: 'center',
      justifyContent:'center'
   },
   titleText: {
      fontSize: widthScale('5%'), 
      fontFamily: 'OpenSans',
      fontWeight: '700',
      color: '#ffffff'
   },
   subText: {
      color: '#ffffff',
      marginVertical:heightScale(3)
   },
   greet:{
      width:widthScale("75%"),
      height: heightScale('15%'),
      // backgroundColor:'#fff'
   },
   greetText: {
      fontSize: widthScale('8%'),  
      fontWeight: '700',
      color: '#ffffff',
      fontStyle:'italic'
   },
   input: {
      width: widthScale('75%'),
      height: heightScale('7%'),
      marginTop: widthScale('8%'),
      paddingLeft: widthScale('4%'),
      borderRadius: widthScale('2%'),
      backgroundColor: '#333446',
      color: '#fff'
   },
   forgetPass: {
      width: widthScale('75%'),
      marginTop: widthScale('2%'),
      marginBottom: widthScale('8%'),
   },
   signup: {
      marginTop: widthScale('8%'),
   },
   button:{
      width: widthScale('75%'),
      height: heightScale('7%'),
      alignItems:'center',
      justifyContent:'center',
      borderWidth:widthScale(0.2),
      borderColor:'#333446',
      borderRadius:widthScale('2%'),
      flexDirection:'row'
   },
   btnText:{
      color:'#fff'
   },
   googleIcon:{
      width:widthScale('6%'),
      marginRight:widthScale('2%')
   }
});

export default styles;