import { apiClient } from '@/api/client'
import { StorageItem } from '@/components/StorageItem'
import { useSession } from '@/lib/authCtx'
import { Directory } from '@/types/Directory'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Button, FlatList, StyleSheet, View } from 'react-native'

export default function StorageScreen() {
  const { signOut } = useSession()

  const { id } = useLocalSearchParams<{ id?: string }>()

  const [items, setItems] = useState<Directory[]>([])

  useEffect(() => {
    const fetchData = async (parentId: string | undefined) => {
      const directories = await apiClient.get('/directories', {
        params: {
          parentId: parentId || '',
        },
      })

      const files = await apiClient.get('/files', {
        params: {
          directoryId: parentId || '',
        },
      })

      setItems([...directories.data, ...files.data])
    }

    fetchData(id)
  }, [id])

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <StorageItem item={item} />}
        keyExtractor={(item) => item.id}
      />
      <hr />
      <Button
        title="Logout"
        onPress={() => {
          signOut()
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
