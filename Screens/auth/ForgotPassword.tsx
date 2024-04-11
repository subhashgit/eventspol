import React, { memo, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, TextInput, ImageBackground } from 'react-native';
import Logo from '../components/Logo';
import {theme} from '../../constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import AuthContext from '../helpers/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
var BASE_URL = require('../helpers/ApiBaseUrl.tsx');
import Loader from '../components/Loader';
var CommonS = require('../helpers/styles.tsx');
import {
  mobileValidator, passwordValidator
  } from '../helpers/Validator';

export default function ForgotPassword({ navigation }) {
    const { signIn } = useContext(AuthContext);
    const [mobile, setMobile] = useState({ value: '', error: '' });
    const [NewPassword, setNewPassword] = useState({ value: '', error: '' });
    
    const [otpField, setotpField] = useState({ value: '', error: '' });
    
    const [loading, setloading] = useState(false);
    const [signinerr, setSigninerr] = useState(false);
    const [otpValidate, setotpValidate] = useState(false );

    const _onForgotPressed = () => {
      const mobileError = mobileValidator(mobile.value);

    
        if (mobileError ) {
          setMobile({ ...mobile, error: mobileError });
          return;
        }


        setloading(true);
        const formData = new FormData();
        formData.append('mobile', mobile.value);
        fetch(BASE_URL+'user.php?action=forgotPassword', {
          method: 'POST',
          body: formData,
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
           
          }
          return response.json();
        })
        .then(data => {
            
          if(data.status === true){
            setMobile({ ...mobile, error: '' });
            setSigninerr(false);
            setloading(false);
            setotpValidate(true);
           


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


      const _onotpValidate = () => {
        if(otpField.value == '' ){
          setotpField({ ...otpField, error: 'OTP can not be empty'});
        }
        
        const passwordErroro = passwordValidator(NewPassword.value);
      
          if ( passwordErroro  ) {
 
            setNewPassword({ ...NewPassword, error: passwordErroro });
            return;
          }
  
  
          const formData = new FormData();
          formData.append('mobile', mobile.value);
          formData.append('otp', otpField.value);
          formData.append('newPassword', NewPassword.value);
          fetch(BASE_URL+'user.php?action=updatePassword', {
            method: 'POST',
            body: formData,
            
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
              
            if(data.status === true){

              alert(data.message);
              navigation.navigate('LogIn');
            }
            else{
  
                  setSigninerr(data.message);
                }
            //          console.log(data);
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
     
        }

      


  return (
    <View style={styles.MainContainer}>
       <LinearGradient
        
    colors={[theme.colors.PrimaryColor, theme.colors.secondaryColor]}
    style={styles.background}
  >
    <Logo />
    <Text style={CommonS.title}>Forgot Password</Text>
    </LinearGradient>
    <View style={styles.container}>
           
<View style={CommonS.signwrapper}>

<View style={CommonS.row}>
<Ionicons name="mail" size={20} color={theme.colors.PrimaryColor} style={CommonS.boxicons} />
<TextInput
  placeholder="Mobile"
  returnKeyType="next"
  value={mobile.value}
  onChangeText={text => setMobile({ value: text, error: '' })}
  error={!!mobile.error}
  style={CommonS.textbox}
  errorText={mobile.error}
  editable = {!otpValidate}

/>
</View>
<Text style={CommonS.errormsg}>{mobile.error}</Text>




{ otpValidate !== false  ? 
<>
<View style={CommonS.row}>
<Ionicons name="lock-closed" size={20} color={theme.colors.PrimaryColor} style={CommonS.boxicons} />
<TextInput
  placeholder="Otp"
  returnKeyType="next"
  value={otpField.value}
  onChangeText={text => setotpField({ value: text, error: '' })}
  error={!!otpField.error}
  style={CommonS.textbox}
  errorText={otpField.error}
/>
</View>
<Text style={CommonS.errormsg}>{otpField.error}</Text>

<View style={CommonS.row}>
<Ionicons name="lock-closed" size={20} color={theme.colors.PrimaryColor} style={CommonS.boxicons} />
<TextInput
  placeholder="New Password"
  returnKeyType="next"
  value={NewPassword.value}
  onChangeText={text => setNewPassword({ value: text, error: '' })}
  error={!!NewPassword.error}
  style={CommonS.textbox}
  errorText={NewPassword.error}
/>
</View>
<Text style={CommonS.errormsg}>{NewPassword.error}</Text>
</>
:
null}






<Text style={CommonS.errormsg}>  {signinerr}</Text>

{otpValidate !== false ? 
<TouchableOpacity style={CommonS.buttonStyle}  onPress={_onotpValidate}>
      <Text style={CommonS.buttontxt}>Change Password</Text>
  </TouchableOpacity>
: <TouchableOpacity style={CommonS.buttonStyle}  onPress={_onForgotPressed}>
<Text style={CommonS.buttontxt}>Send OTP</Text>
</TouchableOpacity> }


<View style={CommonS.rowf}>

  <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
    <Text style={CommonS.link}>Sign In</Text>
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
  background: {        height: 350,display:'flex',justifyContent:'center',alignItems:'center'},
});
