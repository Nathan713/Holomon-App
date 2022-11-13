import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function BackArrow({onPress}) {
  return (
    <View>
      <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                style={styles.appButtonContainer}
    >
        <AntDesign name="back" size={50} color="black"/>
            </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})