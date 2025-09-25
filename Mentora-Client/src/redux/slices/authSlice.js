import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../utils/api'

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
}

export const loginThunk = createAsyncThunk('auth/login', async ({ email, password }) => {
  const res = await api.post('/auth/login', { email, password })
  return res.data
})

export const signupThunk = createAsyncThunk('auth/signup', async ({ name, email, password, role }) => {
  const res = await api.post('/auth/register', { name, email, password, role })
  return res.data
})

export const logoutThunk = createAsyncThunk('auth/logout', async (_, { getState }) => {
  const { refreshToken } = getState().auth
  try {
    await api.post('/auth/logout', refreshToken ? { refreshToken } : {})
  } catch (_) {}
  return true
})

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens(state, action) {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    logout(state) {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    })
    builder.addCase(signupThunk.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    })
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
    })
  },
})

export const { setTokens, logout } = slice.actions
export default slice.reducer


