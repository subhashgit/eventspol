import React, { memo } from 'react';
import { Image, StyleSheet,View } from 'react-native';

const Loader = () => (
  <View style={styles.loaderScr}>
  <Image source={require('../../assets/loader.gif')} style={styles.image} />
  </View>
);

const styles = StyleSheet.create({
  image: {
    width: 64,
    height: 64,
    marginBottom: 12,
  },
  loaderScr:{
    display:'flex',flex:1,alignItems:'center',justifyContent:'center',position:'absolute',zIndex:999,height:'100%',width:'100%',left:0,top:0,
    backgroundColor:'rgba(0,0,0,.4)'
  }
});

export default memo(Loader);