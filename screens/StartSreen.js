import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/config";
import { Image } from "@rneui/themed";
import { useEffect, useLayoutEffect } from "react";
const StartSreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("Home");
      }else{
        navigation.replace("Login");
      }
    });
    return unsubscribe;
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://tse2.mm.bing.net/th?id=OIP.gVyjtqCkYVTLwZ-Stuo8KAAAAA&pid=Api&P=0",
        }}
        style={{ width: 150, height: 150, marginBottom: 15 }}
      />
    </View>
  );
};

export default StartSreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
    paddingBottom: 0,
    marginBottom: 0,
  },
});
