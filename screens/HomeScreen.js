import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { signOut } from "firebase/auth";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "@rneui/themed";
import { auth, db } from "../config/config";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const isFocused = useIsFocused();
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName
    })
  }
  useEffect(() => {
    const fetchCat = async () => {
      let data = [];
      const querySnapshot = await getDocs(collection(db, "chats"));
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, data: doc.data() });
      });
      setChats(data);
    };
    fetchCat();
  }, [isFocused]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerTitleAlign: "center",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View>
          <TouchableOpacity onPress={signOutUser}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginLeft: 20,
          }}
        >
          <TouchableOpacity onPress={() => console.log(chats)}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("AddChat")}>
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  return (
    <SafeAreaView>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {chats.map((chat) => (
          <CustomListItem key={chat.id} id={chat.id} chatName={chat.data.chatName} enterChat={enterChat} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container:{
    height: "100%",
  }
});
