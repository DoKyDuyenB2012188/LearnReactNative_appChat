import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ChatSreem = ({navigation, route}) => {
  return (
    <View>
      <Text>{route.params.chatName}</Text>
    </View>
  )
}

export default ChatSreem

const styles = StyleSheet.create({})