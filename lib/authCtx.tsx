import { apiClient } from '@/api/client'
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Store } from './store'

type SessionContextType = {
  session: { token: string; user: { id: string; name: string } } | null
  isLoading: boolean
  signIn: (username: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<SessionContextType['session']>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadSession = async () => {
      const token = await Store.getItem('jwt_token')
      const user = await Store.getItem('user_data')
      if (token && user) {
        setSession({ token, user: JSON.parse(user) })
      }
      setIsLoading(false)
    }
    loadSession()
  }, [])

  const signIn = async (username: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await apiClient.post('/login', {
        name: username,
        password,
      })
      const { token, user } = response.data

      await Store.setItem('jwt_token', token)
      await Store.setItem('user_data', JSON.stringify(user))

      setSession({ token, user })
    } catch (error) {
      console.error('Login failed:', error)
      throw new Error('Invalid credentials')
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    await Store.deleteItem('jwt_token')
    await Store.deleteItem('user_data')
    setSession(null)
  }

  return (
    <SessionContext.Provider value={{ session, isLoading, signIn, signOut }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
}
