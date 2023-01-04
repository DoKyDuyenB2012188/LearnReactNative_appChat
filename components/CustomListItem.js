import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "@rneui/themed";
import { TouchableOpacity } from "react-native";
import { db } from "../config/config";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);
  useEffect(() => {
    const unsubscribe = query(
      collection(db, `chats/${id}/messages`),
      orderBy("timestamp", "asc")
    );
    onSnapshot(unsubscribe, (querySnapshot) => {
      setChatMessages(querySnapshot.docs.map((doc) => doc.data()));
    });
  });
  return (
    <ListItem
      onPress={() => enterChat(id, chatName)}
      key={id}
      style={{ borderBottomWidth: 1, borderColor: "rgb(239, 239, 239)" }}
    >
      <Avatar
        rounded
        source={{
          uri: chatMessages[chatMessages.length -1]?.photoURL||"https://cdn2.iconfinder.com/data/icons/basic-39/140/profile__account__avatar__male__user-512.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle>
          {chatMessages.length !== 0 ? `${chatMessages[chatMessages.length -1]?.displayName}: ${chatMessages[chatMessages.length -1]?.message}` : "make new chat now!" }
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
