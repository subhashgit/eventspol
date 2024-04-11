import React, { memo, useState, useContext } from 'react';
import { StyleSheet,View, Text,TouchableOpacity,ImageBackground } from "react-native";
import * as SecureStore from 'expo-secure-store';
import Logo from './components/Logo';
import {theme} from './../constants/theme';
import Navigation from '../Navigation/navigation';
export default function WelcomeScreen({navigation}) {
//  SecureStore.setItemAsync('User_visit', '1' );

  return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/political.jpg')} resizeMode="cover" style={styles.image}>
            <Logo />
      <Text style={styles.title}>Welcome to Ministes</Text>
      <Text style={styles.subtitle}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </Text>
      <View
        style={styles.separator}
      />
      <TouchableOpacity style={styles.buttonStyle}  onPress={() => navigation.navigate('LogIn')}>
      <Text style={styles.buttontxt}>Log In</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.buttonStyle}  onPress={() => navigation.navigate('SignUp')}>
      <Text style={styles.buttontxt}>Sign Up</Text>
  </TouchableOpacity>
       </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  image:{ flex:1, alignItems: "center",
  justifyContent: "center",
  padding:25,},
  title: {
    fontSize: 20,
    color:'#fff',
    fontWeight: "bold",
  },
  subtitle:{ fontSize: 17,textAlign:'center',color:'#fff',marginTop:10},

  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonStyle: {    width: '100%',    marginVertical: 5,    paddingVertical: 15,backgroundColor:theme.colors.PrimaryColor,  },
  buttontxt: {color:'#fff',textAlign:'center'},
});