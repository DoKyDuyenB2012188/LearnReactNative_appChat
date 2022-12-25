import { StyleSheet, Text, View, KeyboardAvoidingView, Alert } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Button, Input } from "@rneui/themed";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/config";
const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
          photoURL:
            imageUrl ||
            "https://tse4.mm.bing.net/th?id=OIP.nTTHdd5x7QyWDoSMRNsCLwHaHa&pid=Api&P=0",
        });
        // ...
      })
      .catch((error) => {
        Alert.alert("Regester failed", "Wrong email or email already exists!")
      });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
      headerTitleAlign: "center"
    });
  }, [navigation]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      enabled
      style={styles.container}
    >
      <Text h3 style={{ marginBottom: 15, fontSize: 25, fontWeight: "600" }}>
        Create a Signal Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full name"
          type="text"
          autoFocus
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          type="email"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="ImageUrl"
          type="text"
          onChangeText={(text) => setImageUrl(text)}
        />
      </View>
      <Button
        containerStyle={styles.button}
        raised
        title="Register"
        onPress={register}
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
