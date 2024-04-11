import React, { memo, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, TextInput, ImageBackground,Platform  } from 'react-native';
import Logo from '../components/Logo';
import {theme} from '../../constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import Loader from '../components/Loader';
import { LinearGradient } from 'expo-linear-gradient';
var BASE_URL = require('../helpers/ApiBaseUrl.tsx');
var CommonS = require('../helpers/styles.tsx');
import {
    emailValidator,
    passwordValidator,
    nameValidator,
    mobileValidator
  } from '../helpers/Validator';


export default function SignUp({ navigation }) {

    const [name, setName] = useState({ value: '', error: '' });
    const [mobile, setMobile] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [loading, setloading] = useState(false);
    const [signinerr, setSigninerr] = useState(false);
    const _onSignUpPressed = () => {
        const nameError = nameValidator(name.value);
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        const mobileError = mobileValidator(mobile.value);
    
        if (emailError || passwordError || nameError || mobileError) {
          setName({ ...name, error: nameError });
          setEmail({ ...email, error: emailError });
          setPassword({ ...password, error: passwordError });
          setMobile({ ...mobile, error: mobileError });
          return;
        }
        setloading(true);

        const formData = new FormData();
        formData.append('email', email.value);
        formData.append('password', password.value);
        formData.append('name', name.value);
        formData.append('mobile', mobile.value);
        formData.append('deviceName', Platform.OS);

        
        
        
        fetch(BASE_URL+'user.php?action=signup', {
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
            setloading(false);
            navigation.navigate('LogIn' );

          }
          else{
                setSigninerr(data.message);
                setloading(false);
          }
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          setloading(false);
        });
   
      }
      
  return (
    <View style={CommonS.MainContainer}>
       <LinearGradient
        
    colors={[theme.colors.PrimaryColor, theme.colors.secondaryColor]}
    style={styles.background}
  >
    <Logo />
    <Text style={styles.title}>Sign Up</Text>
    </LinearGradient>
    <View style={styles.container}>
            
<View style={CommonS.signwrapper}>
  <View style={CommonS.row}>
<Ionicons name="person" size={20} color={theme.colors.PrimaryColor} style={CommonS.boxicons} />
<TextInput
  placeholder="Name"
  returnKeyType="next"
  value={name.value}
  onChangeText={text => setName({ value: text, error: '' })}
  error={!!name.error}
  style={CommonS.textbox}
  errorText={name.error}
/>

</View>
<Text style={CommonS.errormsg}>{name.error}</Text> 
  <View style={CommonS.row}>
<Ionicons name="call-sharp" size={20} color={theme.colors.PrimaryColor} style={CommonS.boxicons} />
<TextInput
  placeholder="Mobile"
  returnKeyType="next"
  value={mobile.value}
  onChangeText={text => setMobile({ value: text, error: '' })}
  error={!!mobile.error}
  style={CommonS.textbox}
  errorText={mobile.error}
/>

</View>
<Text style={CommonS.errormsg}>{mobile.error}</Text>
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
<TouchableOpacity style={CommonS.buttonStyle}  onPress={_onSignUpPressed}>
      <Text style={CommonS.buttontxt}>Submit</Text>
  </TouchableOpacity>


<View style={CommonS.rowf}>
  <Text style={CommonS.label}>Already have an account? </Text>
  <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
    <Text style={CommonS.link}>Login</Text>
  </TouchableOpacity>
</View></View>

</View>
{loading && <Loader/> }
   </View>
  );
}

const styles = StyleSheet.create({
  container: {    justifyContent: 'center', alignItems: "center"},  
  title:{fontSize:35,color:'#fff'},
  background: {        height: 350,display:'flex',justifyContent:'center',alignItems:'center'},
});
