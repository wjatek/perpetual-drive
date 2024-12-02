import { Store } from '@/lib/store'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export const API_URL = 'http://localhost:3000/'

export const apiClient = axios.create({
  baseURL: API_URL,
})

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token)
    const currentTime = Date.now() / 1000
    return decoded.exp < currentTime
  } catch (error) {
    console.error('Invalid token', error)
    return true
  }
}

apiClient.interceptors.request.use(async (config) => {
  const token = await Store.getItem('jwt_token')
  if (token) {
    if (isTokenExpired(token)) await Store.deleteItem('jwt_token')

    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
