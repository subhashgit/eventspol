import React, { memo, useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, TextInput, Platform, Image,ScrollView  } from 'react-native';
import {theme} from '../../constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
var BASE_URL = require('../helpers/ApiBaseUrl.tsx');
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';
var UserDetail = require('../helpers/MyProfileDetail.tsx');
var CommonS = require('../helpers/styles.tsx');
import Loader from '../components/Loader';
import {  passwordValidator } from '../helpers/Validator';

export default function ChangePassword({ navigation }) {

    const [password, setPassword] = useState({ value: '', error: '' });
    const [newPassword, setNewPassword] = useState({ value: '', error: '' });
    const [confirmNewPassword, setConfirmNewPassword] = useState({ value: '', error: '' });
    const [loading, setloading] = useState(false);
    const [signinerr, setSigninerr] = useState(false);

    const _onChange = async () => {

        const passwordValidator = passwordValidator(password.value);
        const newpasswordValidator = passwordValidator(newPassword.value);
        const confirmNewpasswordValidator = passwordValidator(confirmNewPassword.value);


        if (passwordValidator ||  newpasswordValidator || confirmNewpasswordValidator) {
          setPassword({ ...password, error: passwordValidator });
          setNewPassword({ ...newPassword, error: newpasswordValidator });
          setConfirmNewPassword({ ...confirmNewPassword, error: confirmNewpasswordValidator });
          return;
        }
        setloading(true);
        const token = await SecureStore.getItemAsync('userToken');   
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append('Content-Type', 'multipart/form-data');
        const formdata = new FormData();
        formdata.append("password", password.value);
        formdata.append("newPassword", newPassword.value);
        formdata.append("confirmNewPassword", confirmNewPassword.value);
      
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow"
        };
        
        fetch(BASE_URL+"user.php?action=ChangePassword", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            console.log(result)
            setloading(false);
          })
          .catch((error) =>{ console.error(error);
            setloading(false);
          });
          
      }
 
  return (
    <View style={styles.container}>
      <ScrollView>
            <LinearGradient
        
        colors={[theme.colors.PrimaryColor, theme.colors.secondaryColor]}
        style={styles.background}
      />
      <View style={styles.innerwrapper}>
        
<View style={CommonS.signwrapper}>




  <View style={CommonS.row}>
    <Ionicons name="person" size={20} color={theme.colors.PrimaryColor} style={CommonS.boxicons} />
    <TextInput
      placeholder="Current Password"
      returnKeyType="next"
      value={password.value}
      onChangeText={text => setPassword({ value: text, error: '' })}
      error={!!password.error}
      style={CommonS.textbox}
      textContentType="password"
      errorText={password.error}
    />
</View>
<Text style={styles.errormsg}>{password.error}</Text> 
  <View style={CommonS.row}>
<Ionicons name="call-sharp" size={20} color={theme.colors.PrimaryColor} style={CommonS.boxicons} />
<TextInput
  placeholder="New Password"

  returnKeyType="next"
  value={newPassword.value}
  onChangeText={text => setNewPassword({ value: text, error: '' })}
  error={!!newPassword.error}
  style={CommonS.textbox}
  textContentType="password"
  errorText={newPassword.error}
/>

</View>
<Text style={CommonS.errormsg}>{newPassword.error}</Text>
<View style={CommonS.row}>
<Ionicons name="mail" size={20} color={theme.colors.PrimaryColor} style={CommonS.boxicons} />
<TextInput
  placeholder="Confirm New Password"
  returnKeyType="next"

  value={confirmNewPassword.value}
  onChangeText={text => setConfirmNewPassword({ value: text, error: '' })}
  error={!!confirmNewPassword.error}
  errorText={confirmNewPassword.error}
  textContentType="password"
  style={CommonS.textbox}
  secureTextEntry
/>
</View>
<Text style={CommonS.errormsg}>{confirmNewPassword.error}</Text>


<Text style={CommonS.errormsg}>  {signinerr}</Text>
<TouchableOpacity style={CommonS.buttonStyle}  onPress={_onChange}>
      <Text style={CommonS.buttontxt}>Change</Text>
  </TouchableOpacity>

</View>

</View>

</ScrollView>
{loading ? <Loader/>: null }
   </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},
    background: {        height: 150,},
  rowf:{width:'100%',display:'flex',flexDirection:'row',},
  label:{fontSize:18},
  innerwrapper:{paddingLeft:15,paddingRight:15},
  image_edit:{height:120,width:120,borderRadius:80,alignSelf:'center'},
  editimage:{backgroundColor:theme.colors.PrimaryColor,color:'#fff',width:140,paddingVertical:5,paddingHorizontal:8,
  display:'flex',alignItems:'flex-start',justifyContent:'center',borderRadius:50,alignSelf:'center',marginTop:10}
});
