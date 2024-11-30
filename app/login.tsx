import { useSession } from '@/auth/ctx';
import { useRouter } from 'expo-router'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function LoginScreen() {
  const { signIn } = useSession();

  const router = useRouter()

  const handleLogin = () => {
    signIn();
    router.replace('/(app)/storage')
  }

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={handleLogin} />
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
