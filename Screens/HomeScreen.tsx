import React, { memo, useState, useContext } from 'react';
import { StyleSheet,View, Text,TouchableOpacity } from "react-native";
import AuthContext from './helpers/AuthContext';
import * as SecureStore from 'expo-secure-store';
export default function Home() {
//  SecureStore.setItemAsync('User_visit', '1' );
  const { signOut } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to home</Text>
      <View
        style={styles.separator}
      />
       <TouchableOpacity onPress={() => signOut()}>
    <Text>Sign Out</Text>
  </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});