import React, { memo, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, TextInput, ImageBackground } from 'react-native';
import Logo from '../components/Logo';
import {theme} from '../../constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import AuthContext from '../helpers/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import HeaderAuth from '../components/HeaderAuth';
var BASE_URL = require('../helpers/ApiBaseUrl.tsx');
var CommonS = require('../helpers/styles.tsx');
import Loader from '../components/Loader';
import {
    emailValidator,
    passwordValidator
  } from '../helpers/Validator';

export default function LogIn({ navigation }) {
 

    const { signIn } = useContext(AuthContext);
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [loading, setloading] = useState(false);
    const [signinerr, setSigninerr] = useState(false);
    const _onSignUpPressed = () => {

        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);  
        if (emailError || passwordError) {
          setEmail({ ...email, error: emailError });
          setPassword({ ...password, error: passwordError });
          return;
        }
        setloading(true);

        const formData = new FormData();
        formData.append('email', email.value);
        formData.append('password', password.value);
        
        fetch(BASE_URL+'user.php?action=login', {
          method: 'POST',
          body: formData,
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
            setloading(false);
          }
          return response.json();
        })
        .then(data => {

          if(data.status === true){
            signIn({data});
            setloading(false);
          navigation.navigate('Root' );

        }
        else{
              setSigninerr(data.message);
              setloading(false);
        }
          //          console.log(data);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          setloading(false);
        });
   
      }
      
  return (
    <View style={styles.MainContainer}>
       <LinearGradient
        
    colors={[theme.colors.PrimaryColor, theme.colors.secondaryColor]}
    style={styles.background}
  >
    <Logo />
    <Text style={CommonS.title}>Sign In</Text>
    </LinearGradient>
  
    <View style={CommonS.container}>
            
         
          
<View style={CommonS.signwrapper}>

<View style={CommonS.row}>
<Ionicons name="mail" size={20} color={theme.colors.PrimaryColor} style={CommonS.boxicons} />
<TextInput
  placeholder="Email"
  returnKeyType="next"
  
  value={email.value}
  onChangeText={text => setEmail({ value: text, error: '' })}
  error={!!email.error}
  errorText={email.error}
  autoCapitalize="none"
  autoCompleteType="email"
  textContentType="emailAddress"
  style={CommonS.textbox}
  keyboardType="email-address"
/>
</View>
<Text style={CommonS.errormsg}>{email.error}</Text>
<View style={CommonS.row}>
<Ionicons name="lock-closed" size={20} color={theme.colors.PrimaryColor} style={CommonS.boxicons} />
<TextInput
  placeholder="Password"
  returnKeyType="done"
  value={password.value}
  onChangeText={text => setPassword({ value: text, error: '' })}
  error={!!password.error}
  errorText={password.error}
  style={CommonS.textbox}
  secureTextEntry
/>
</View>
<Text style={CommonS.errormsg}>{password.error}</Text>

<Text style={CommonS.errormsg}>  {signinerr}</Text>

<TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
    <Text style={CommonS.link}>Forgot Password</Text>
  </TouchableOpacity>

<TouchableOpacity style={CommonS.buttonStyle}  onPress={_onSignUpPressed}>
      <Text style={CommonS.buttontxt}>Submit</Text>
  </TouchableOpacity>



<View style={CommonS.rowf}>
  <Text style={CommonS.label}>Don't have a account? </Text>
  <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
    <Text style={CommonS.link}>Sign Up</Text>
  </TouchableOpacity>
</View>
</View>

</View>
{loading && <Loader/>}
   </View>
  );
}

const styles = StyleSheet.create({
  MainContainer:{flex:1},
  container: {    justifyContent: 'center', alignItems: "center"},  
  chagepasstext:{color:'green',width:'100%',textAlign:'center',fontSize:18},
  background: {        height: 350,display:'flex',justifyContent:'center',alignItems:'center'},
});
