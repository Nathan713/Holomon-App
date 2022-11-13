import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('key', jsonValue)
    } catch(e) {
      // save error
    }
  
    console.log('Done.')
  }

export const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('key')
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch(e) {
      // read error
    }
  
    console.log('Done.')
  }

export const removeItemValue = async () => {
    try {
        await AsyncStorage.removeItem('key');
        return true;
    }
    catch(exception) {
        return false;
    }
}
  