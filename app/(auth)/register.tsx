import { Link } from "expo-router";
import { useState } from "react"
import { Button, StyleSheet, Text, TextInput, View } from "react-native";




export const RegisterScreen = () => {
   const [Username, setUsername] = useState ("");
   const [email, setEmail] = useState ("");
   const [password, setPassword] = useState ("");


   const handelregister = () => {
       console.log("registration attempt with:", Username, email, password)
   }


   return (
       <View style={styles.container}>
           <TextInput
           style={styles.input}
           placeholder="username"
           value={Username}
           onChangeText={setUsername}
           />


           <TextInput
           style={styles.input}
           placeholder="email"
           value={email}
           onChangeText={setEmail}
           keyboardType= "email-address"
           autoCapitalize="none"
           />


           <TextInput
           style={styles.input}
           placeholder="password"
           value={password}
           onChangeText={setPassword}
           secureTextEntry
           />


           <Button
           title="register"
           onPress={handelregister}
           />


           <Link href={'/(auth)/Login'}> 
           <Text style={styles.registertext}> already have an accout? log in here!</Text>
           </Link>


       </View>
   )
}




const styles = StyleSheet.create ({
   container:{
       flex:1,
       justifyContent: 'center',
       padding: 16,
   },
   input:{
       height:40,
       borderBlockColor: 'grey',
       borderWidth:1,
       marginBottom: 12,
       paddingLeft: 8,
   },
   registertext:{
       margin:16,
       color:'blue',
       textAlign: 'center',
   }
})

export default RegisterScreen