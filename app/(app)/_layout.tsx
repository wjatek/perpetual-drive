import { Ionicons } from '@expo/vector-icons'
import { Redirect, Tabs } from 'expo-router'
import React from 'react'
import { Platform, Text } from 'react-native'
import { useSession } from '../../auth/ctx'

export default function TabLayout() {
  const { session, isLoading } = useSession()

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (!session) {
    return <Redirect href="/login" />
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="storage"
        options={{
          title: 'Storage',
          tabBarIcon: ({ color }) => (
            <Ionicons name="folder" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wall"
        options={{
          title: 'Wall',
          tabBarIcon: ({ color }) => (
            <Ionicons name="image" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
