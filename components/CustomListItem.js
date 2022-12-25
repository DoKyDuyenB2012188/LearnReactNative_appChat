import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ListItem, Avatar } from "@rneui/themed";
import { TouchableOpacity } from "react-native";

const CustomListItem = ({ id, chatName, enterChat }) => {
  return (
    <ListItem
      onPress={() => enterChat(id, chatName)}
      key={id}
      style={{ borderBottomWidth: 1, borderColor: "rgb(239, 239, 239)" }}
    >
      <Avatar
        rounded
        source={{
          uri: "https://cdn2.iconfinder.com/data/icons/basic-39/140/profile__account__avatar__male__user-512.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle>AGB</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
