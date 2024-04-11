import React, { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
const HeaderAuth = ({navigation}) => (
    <View style={styles.topback}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Ionicons name='arrow-back-outline' size={30}/>
            </TouchableOpacity>
    </View>
 
);

const styles = StyleSheet.create({
    topback: {
    width: '100%',
  },
});

export default memo(HeaderAuth);