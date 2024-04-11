import React, { memo, useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, TextInput, Platform, Image,ScrollView  } from 'react-native';
import Logo from '../components/Logo';
import {theme} from '../../constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
var BASE_URL = require('../helpers/ApiBaseUrl.tsx');
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';
var UserDetail = require('../helpers/MyProfileDetail.tsx');
import * as ImagePicker from 'expo-image-picker';
var CommonS = require('../helpers/styles.tsx');
import Loader from '../components/Loader';
import {
    emailValidator,
    nameValidator,
    mobileValidator
  } from '../helpers/Validator';


export default function EditProfile({ navigation }) {

    const [user, setuser] = useState([]);

    const [image, setImage] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [name, setName] = useState({ value: '', error: '' });
    const [mobile, setMobile] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [bio, setBio] = useState({ value: '', error: '' });
    const [loading, setloading] = useState(false);
    const [signinerr, setSigninerr] = useState(false);
    
    useEffect(() => {
      async function fetchUserDetail() {
      let  UserId = await SecureStore.getItemAsync('userID');
      await  UserDetail.UserProfie(UserId).then((getdata) => {
          setuser(getdata.data);   
          setName({value: getdata.data.name , error:''}); 
          setMobile({value: getdata.data.mobile , error:''}); 
          setEmail({value: getdata.data.email , error:''}); 
          setBio({value: getdata.data.aboutMe , error:''}); 


          if(getdata.data.userImage !== null){

            setImageUri(BASE_URL+'uploads/userImages/'+getdata.data.userImage);
                 }
                
       });
    }
    fetchUserDetail();


    }, []);
 
   


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
         if (!result.canceled) {
          setImage(result.assets[0]);
          setImageUri(result.assets[0].uri);
        }
      };



    const _onSaveInfo = async () => {
        const nameError = nameValidator(name.value);
        const emailError = emailValidator(email.value);
        const mobileError = mobileValidator(mobile.value);
    



        if (emailError ||  nameError || mobileError) {
          setName({ ...name, error: nameError });
          setEmail({ ...email, error: emailError });
          setMobile({ ...mobile, error: mobileError });
          return;
        }
        setloading(true);
        const token = await SecureStore.getItemAsync('userToken');   
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append('Content-Type', 'multipart/form-data');
        const formdata = new FormData();
        formdata.append("email", email.value);
        formdata.append("name", name.value);
        formdata.append("mobile", mobile.value);
        formdata.append("deviceName", Platform.OS);
        formdata.append("aboutMe", bio.value);
        formdata.append("deviceToken", "");
        formdata.append("userImage", {uri:image.uri,name:image.fileName,type:image.mimeType});
      
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow"
        };
        
        fetch(BASE_URL+"user.php?action=updateUser", requestOptions)
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
        
<View style={styles.signwrapper}>




    {imageUri !== null && 
    <Image source={{ uri: imageUri }} style={styles.image_edit} />
  }
<TouchableOpacity onPress={pickImage} style={styles.editico}>
    <Text style={styles.editimage}><Ionicons name="pencil" size={16} color={'#fff'} style={CommonS.boxicons} /> Upload Image</Text>
</TouchableOpacity>
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
  style={styles.textbox}
  keyboardType="email-address"
/>
</View>
<Text style={CommonS.errormsg}>{email.error}</Text>
<View style={CommonS.row}>
<Ionicons name="information-circle" size={20} color={theme.colors.PrimaryColor} style={CommonS.boxicons} />
<TextInput
  placeholder="Bio"
  multiline={true}
  numberOfLines={10}

  returnKeyType="done"
  value={bio.value}
  onChangeText={text => setBio({ value: text, error: '' })}
  style={[CommonS.textbox,CommonS.textarea]}
  secureTextEntry
/>
</View>

<Text style={CommonS.errormsg}>  {signinerr}</Text>
<TouchableOpacity style={CommonS.buttonStyle}  onPress={_onSaveInfo}>
      <Text style={CommonS.buttontxt}>Save</Text>
  </TouchableOpacity>


  <TouchableOpacity style={CommonS.buttonBorder}  onPress={() =>navigation.navigate('ChangePassword')}>
      <Text style={CommonS.borderbtntxt}>Change Password</Text>
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
  signwrapper:{padding:25,backgroundColor:theme.colors.transparent,borderRadius:5, shadowColor:'#000', marginTop:-70},

  errormsg:{color:'red',textAlign:'left',width:'100%'},
  rowf:{width:'100%',display:'flex',flexDirection:'row',},
  label:{fontSize:18},
  innerwrapper:{paddingLeft:15,paddingRight:15},

  image_edit:{height:120,width:120,borderRadius:80,alignSelf:'center'},
  editimage:{backgroundColor:theme.colors.PrimaryColor,color:'#fff',width:140,paddingVertical:5,paddingHorizontal:8,
  display:'flex',alignItems:'flex-start',justifyContent:'center',borderRadius:50,alignSelf:'center',marginTop:10}
});
