import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../utils/api'

export const fetchCourses = createAsyncThunk('courses/fetch', async (params) => {
  const res = await api.get('/public/courses', { params })
  return res.data
})

const slice = createSlice({
  name: 'courses',
  initialState: { items: [], total: 0, page: 1, limit: 12 },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.items = action.payload.items
      state.total = action.payload.total
      state.page = action.payload.page
      state.limit = action.payload.limit
    })
  }
})

export default slice.reducer


