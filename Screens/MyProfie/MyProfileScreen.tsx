import React, { memo, useState, useContext, useEffect } from 'react';
import { StyleSheet,View, Text,TouchableOpacity,ScrollView, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import {theme} from '../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';
var UserDetail = require('../helpers/MyProfileDetail.tsx');
var BASE_URL = require('../helpers/ApiBaseUrl.tsx');
export default function MyProfile({navigation}) {
  const [user, setuser] = useState([]);
    useEffect(() => {
      async  function fetchUserDetail() {
      let  UserId = await SecureStore.getItemAsync('userID');
      await  UserDetail.UserProfie(UserId).then((getdata) => {
          setuser(getdata.data);
      });
    }
    fetchUserDetail()
    }, []);
 
const username = user.name;

const userimage = user.userImage;
  return (
    <View>
      <ScrollView>
      <LinearGradient
        
        colors={[theme.colors.PrimaryColor, theme.colors.secondaryColor]}
        style={styles.background}
      />
      <View style={styles.innerwrapper}>
       
      <View style={styles.profileCard}> 
      <TouchableOpacity style={styles.editicon}  onPress={() => navigation.navigate('EditProfile')}>
      <MaterialIcons name='edit' color={theme.colors.PrimaryColor} size={16} />
      <Text>edit</Text>
      </TouchableOpacity>
          <View style={styles.profilePic}>
            
            {userimage ?
            
                         <Image  source={{uri:BASE_URL+'uploads/userImages/'+userimage}} style={styles.profile_img}/>
             :
             <Text  style={[styles.profile_img,styles.ifnoimg]}>{username}</Text> 
             }

            <View>
            <Text style={styles.username}>{user.name}</Text>
            <Text style={styles.useremail}>{user.email}</Text>
            </View>
          </View>
        <View>
          {user.aboutMe ? <Text style={styles.userinfo}>{user.aboutMe}</Text>  : null} 

        </View>
      </View>

      <View style={[styles.profileCard, styles.profileCardbottom]}> 
      <Text style={styles.username}>My Events</Text>
      <Text>No Events right now!</Text>
      </View>
      
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({ 
  background: {
    height: 150,
  },
  innerwrapper:{paddingLeft:15,paddingRight:15},
  profileCard:{width:'100%',backgroundColor:'#fff',display:'flex',justifyContent:'center',alignSelf:'center',marginTop:-20,padding:15,position:'relative'},
  profileCardbottom:{marginTop:20},
  profile_img:{height:80,width:80,borderColor:theme.colors.secondaryColor,borderWidth:2,borderRadius:100},
  profilePic:{display:'flex',flexDirection:'row',alignItems:'center',gap:10},
  username:{fontSize:16,fontWeight:'bold'},
  useremail:{fontSize:12},
  userinfo:{fontSize:12,marginTop:10},
  editicon:{position:'absolute',right:0,top:0,borderColor:theme.colors.PrimaryColor,display:'flex',flexDirection:'row',
    borderWidth:1,paddingHorizontal:10,paddingVertical:5,borderRadius:20,top:5,right:5,alignItems:'center',gap:3
  },
  ifnoimg:{fontSize:88,color:theme.colors.secondaryColor,paddingLeft:22,paddingBottom:5}

  

});