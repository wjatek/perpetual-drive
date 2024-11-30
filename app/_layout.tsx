import { Slot } from 'expo-router'
import { SessionProvider } from '../lib/authCtx'

export default function Root() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  )
}
