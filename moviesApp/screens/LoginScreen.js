import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button  } from 'react-native'
import React, {useState} from 'react'
import { FIREBASE_AUTH } from '../Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');
    const auth = FIREBASE_AUTH;

    const signIn = async () =>{
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        }catch(error){
            console.log(error)
        }
    }

    const signUp = async () =>{
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            navigation.navigate('Home');
            console.log(response);
        }catch(error){
            console.log(error)
        }
    }

    
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Welcome</Text>
    <TextInput
      style={styles.input}
      placeholder="Email"
      placeholderTextColor="white"
      value={email}
      onChangeText={(text)=>setEmail(text)}
    />
    <TextInput
      style={styles.input}
      placeholder="Password"
      placeholderTextColor="white"
      secureTextEntry={true}
      value={password}
      onChangeText={(text)=>setPassword(text)}
    />
    <View style={styles.buttonbox}>
      <Button 
        title="Login"
        onPress={signIn}
        style={styles.button}
        />
        <Button 
        title="Create Account"
        onPress={signUp}
        style={styles.button}
        />
    </View>
    
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#262626"
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
      color: "#facc15"
    },
    input: {
      height: 40,
      width: '80%',
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
      borderRadius: 10,
      color: "#fffbeb"
    },
    button: {
      backgroundColor: "#facc15",
      padding: 10,
      borderRadius: 5,
      marginBottom: 5
    },
    buttonText: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    buttonbox:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16
    }
  });

export default LoginScreen