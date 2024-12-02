import { API_URL, apiClient } from '@/api/client'
import { Directory } from '@/types/Directory'
import { File } from '@/types/File'
import { getFileIcon } from '@/utils/icons'
import { Ionicons } from '@expo/vector-icons'
import * as FileSystem from 'expo-file-system'
import { router } from 'expo-router'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'

interface StorageItemProps {
  item: Directory | File
}

const handlePress = async (item: Directory | File): Promise<void> => {
  if ('directoryId' in item) {
    if (Platform.OS === 'web') {
      try {
        const response = await apiClient.get(`/files/download/${item.id}`, {
          responseType: 'blob',
        })

        const contentType =
          response.headers['content-type'] || 'application/octet-stream'

        const blob = new Blob([response.data], { type: contentType })

        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = item.name
        link.click()
      } catch (error) {
        console.error('Error downloading file:', error)
      }
    } else {
      const { uri: localUri } = await FileSystem.downloadAsync(
        `${API_URL}files/download/${item.id}`,
        FileSystem.documentDirectory + item.name
      )
    }
  } else {
    router.replace(`/storage?id=${item.id}`)
  }
}

export const StorageItem = ({ item }: StorageItemProps) => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={async () => await handlePress(item)}
      style={styles.item}
    >
      {'directoryId' in item ? (
        <Ionicons style={styles.icon} name="folder" size={24} />
      ) : (
        getFileIcon(item.name, styles.icon)
      )}
      {item.name}
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  icon: {
    marginRight: 8,
  },
})
