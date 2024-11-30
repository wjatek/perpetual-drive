import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

export const Store = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      return await AsyncStorage.getItem(key)
    }
    return await SecureStore.getItemAsync(key)
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      return await AsyncStorage.setItem(key, value)
    }
    return await SecureStore.setItemAsync(key, value)
  },
  deleteItem: async (key: string): Promise<void> => {
    if (Platform.OS === 'web') {
      return await AsyncStorage.removeItem(key)
    }
    return await SecureStore.deleteItemAsync(key)
  },
}
