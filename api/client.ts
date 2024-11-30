import { Store } from '@/lib/store'
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000/',
})

apiClient.interceptors.request.use(async (config) => {
  const token = await Store.getItem('jwt_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
