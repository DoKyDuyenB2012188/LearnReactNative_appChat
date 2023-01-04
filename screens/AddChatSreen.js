import { Alert, StyleSheet, View } from "react-native";
import React from "react";
import { useState } from "react";
import { useLayoutEffect } from "react";
import { Button, Input} from "@rneui/themed";
import { Icon } from "@rneui/base";
import { db } from "../config/config";
import { collection, addDoc } from "firebase/firestore";

const AddChatSreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  const createChat = async () => {
    await addDoc(collection(db, "chats"), {
      chatName: input,
    })
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => Alert.alert("Add new failed", "server error"));
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerTitleAlign: "center",
      headerBackTitle: "Chats",
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <Button onPress={createChat} title="Create new Chat" />
    </View>
  );
};

export default AddChatSreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height:"100%"
  }
});
