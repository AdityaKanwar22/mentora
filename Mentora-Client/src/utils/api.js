import axios from 'axios'
import store from '../redux/store'
import { setTokens, logout } from '../redux/slices/authSlice'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const state = store.getState()
  const token = state.auth.accessToken
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let isRefreshing = false
let pendingRequests = []

function onRefreshed(newToken) {
  pendingRequests.forEach((cb) => cb(newToken))
  pendingRequests = []
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      if (isRefreshing) {
        return new Promise((resolve) => {
          pendingRequests.push((token) => {
            original.headers.Authorization = `Bearer ${token}`
            resolve(api(original))
          })
        })
      }
      try {
        isRefreshing = true
        const { auth } = store.getState()
        if (!auth.refreshToken) throw new Error('No refresh token')
        // If backend sets refresh token as HttpOnly cookie, body can be empty
        const body = auth.refreshToken ? { refreshToken: auth.refreshToken } : {}
        const resp = await axios.post(`${api.defaults.baseURL}/auth/refresh`, body, { withCredentials: true })
        store.dispatch(setTokens({ accessToken: resp.data.accessToken, refreshToken: resp.data.refreshToken ?? auth.refreshToken }))
        onRefreshed(resp.data.accessToken)
        original.headers.Authorization = `Bearer ${resp.data.accessToken}`
        return api(original)
      } catch (e) {
        store.dispatch(logout())
        // Graceful redirect after token expiry
        try { window.location.href = '/login' } catch (_) {}
        return Promise.reject(e)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  }
)

export default api


