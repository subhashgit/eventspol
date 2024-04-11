'use strict';
import { StyleSheet } from 'react-native';
import {theme} from '../../constants/theme';
import { Colors } from 'react-native/Libraries/NewAppScreen';

module.exports = StyleSheet.create({
    buttonStyle: {    width: '100%',    marginVertical: 5,    paddingVertical: 15,backgroundColor:theme.colors.PrimaryColor,  },
    buttontxt: {color:'#fff',textAlign:'center'},

    textbox:{ backgroundColor:'#fff',color:'#000',width:'100%',paddingVertical:10,borderRadius:5,paddingLeft:40,
    marginVertical:5,padding:15,fontSize:18},
    textarea:{height:100},
    boxicons:{position:'absolute',left:5,zIndex:1},
    errormsg:{color:'red',textAlign:'left',width:'100%'},
    link:{fontSize:18,fontWeight:'bold',color:theme.colors.PrimaryColor,textDecorationLine:'underline'},
    row:{width:'100%',display:'flex',flexDirection:'row',alignItems:'center', borderBottomColor:'#aaa',borderBottomWidth:1,position:'relative'},
    label:{fontSize:18},
    MainContainer:{flex:1},
      rowf:{width:'100%',display:'flex',flexDirection:'row',},
    signwrapper:{padding:25,backgroundColor:theme.colors.transparent,width:'90%',borderRadius:5, shadowColor:'#000',marginTop:-70},
    buttonBorder: {    width: '100%',    marginVertical: 5,    paddingVertical: 15,borderColor:theme.colors.PrimaryColor,borderWidth:2,  },
    borderbtntxt: {color:theme.colors.PrimaryColor,textAlign:'center'},
  
});
