import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Keyboard,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Avatar, Icon } from "@rneui/base";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { auth, db } from "../config/config";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const ChatSreem = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const sendMessage = async () => {
    Keyboard.dismiss();
    await addDoc(collection(db, `chats/${route.params.id}/messages`), {
      timestamp: serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    })
      .then()
      .catch((err) => Alert.alert("Add new failed", "server error"));
    setInput("");
  };
  useLayoutEffect(() => {
    const unsubscribe = query(
      collection(db, `chats/${route.params.id}/messages`),
      orderBy("timestamp", "asc")
    );
    onSnapshot(unsubscribe, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [route]);
  useLayoutEffect(() => {
    navigation.setOptions(
      {
        title: "Chat",
        headerBackTitleVisible: false,
        headerTitleAlign: "left",
        headerTitle: () => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: 80,
            }}
          >
            <Avatar
              rounded
              marginRight={10}
              source={{
                uri: messages[0]?.data.photoURL||"https://tse4.mm.bing.net/th?id=OIP.nTTHdd5x7QyWDoSMRNsCLwHaHa&pid=Api&P=0",
              }}
            />
            <Text style={{ fontWeight: "800", color: "white", fontSize: 16 }}>
              {route.params.chatName}
            </Text>
          </View>
        ),
        headerRight: () => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: 75,
            }}
          >
            <TouchableOpacity>
              <FontAwesome name="video-camera" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="phone" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ),
      },
      [navigation, messages]
    );
  });
  return (
    <SafeAreaView>
      <StatusBar style="Light" />
      <View
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <>
          <ScrollView style={{ paddingTop:5,paddingBottom: 10}}>
            {messages.map(({ id, data }) =>
              data.email === auth.currentUser.email ? (
                <View key={id} style={styles.rec}>
                  <Avatar
                    position="absolute"
                    bottom={13}
                    right={3}
                    rounded
                    size={25}
                    source={{ uri: data.photoURL }}
                  />
                  <Text style={styles.recieverText}>{data.message}</Text>
                </View>
              ) : (
                <View key={id} style={styles.sender}>
                  <Avatar
                    position="absolute"
                    bottom={-9}
                    left={-11}
                    rounded
                    size={25}
                    source={{ uri: data.photoURL }}
                  />
                  <Text style={styles.sendText}>{data.message}</Text>
                  <Text style={styles.sendName}>{data.displayName}</Text>
                </View>
              )
            )}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput
              onChangeText={(text) => setInput(text)}
              placeholder="Signal Message"
              style={styles.textInput}
              value={input}
            />
            <TouchableOpacity onPress={() => sendMessage()}>
              <Icon name="send" size={24} color="#2B68E6" />
            </TouchableOpacity>
          </View>
        </>
      </View>
    </SafeAreaView>
  );
};

export default ChatSreem;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  recieverText: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
    zIndex: -1,
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    marginTop: 0,
    maxWidth: "80%",
    position: "relative",
    zIndex: -1,
    color: "white",
  },
  sendName: {
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
  sendText:{
    color: "white"
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  textInput: {
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
});
