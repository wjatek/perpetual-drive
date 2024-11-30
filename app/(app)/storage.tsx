import { useSession } from '@/auth/ctx'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function StorageScreen() {
  const { signOut } = useSession()

  return (
    <View style={styles.container}>
      <Text>Storage Screen</Text>
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
