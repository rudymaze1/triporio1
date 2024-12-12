import { Image, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useFonts } from 'expo-font';

const profileScreen= () => {
  const router = useRouter();
  const [loaded, error] = useFonts({
    'poiret': require('/Users/rudy/Desktop/react-proj/triporio1/assets/fonts/PoiretOne-Regular.ttf' ),
    'sulph-bold': require('/Users/rudy/Desktop/react-proj/triporio1/assets/fonts/SulphurPoint-Bold.ttf' ),
    'sulph-reg': require('/Users/rudy/Desktop/react-proj/triporio1/assets/fonts/SulphurPoint-Regular.ttf' ),
    'sulph-light': require('/Users/rudy/Desktop/react-proj/triporio1/assets/fonts/SulphurPoint-Light.ttf' )
  });
  



  const handelback = () => {
    if (router.canGoBack()) {
      router.back(); 
    } else {
      router.replace('/[home]');
    }
  };
const handellogout = () => {
  router.replace('/(auth)/Login')
}






  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={{left:15,}}  onPress={handelback}>
          <Image 
          source={require('/Users/rudy/Desktop/react-proj/triporio1/assets/images/return.png')} // Local image
          style={styles.backbutton} />
          </TouchableOpacity>
          <Text style={{ fontSize:20, left:150, fontFamily:"sulph-bold",}}>Profile</Text>
        </View>


        <ScrollView style={styles.scrollview}> 
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Image 
          source={require('/Users/rudy/Desktop/react-proj/triporio1/assets/images/comingsoon.png')} 
          style={styles.comingsoon} />
          </View>

          <TouchableOpacity style={styles.logoutbutton} onPress={handellogout}>
          <Text style={styles.logouttext}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  comingsoon:{
    marginBottom:0,
    height:400,

  },
  logoutbutton:{
    justifyContent: 'center', 
    alignItems: 'center',   
  },
  logouttext:{
    fontFamily:"sulph-bold",
    color:'white',
    width:350,
    backgroundColor: '#191919',
    borderWidth:1,
    fontSize:20,
    borderRadius:20,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:150,
    paddingRight:15,
  },
  container:{
    flex:1,
    
  },
  scrollview:{
    top:20,

  },
  header:{
    flexDirection:"row",
    top:10,


  },
  backbutton:{
    height:20,
    width:20,
  },

})

export default profileScreen;