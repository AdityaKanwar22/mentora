import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../utils/api'

export const createReview = createAsyncThunk('reviews/create', async ({ courseId, rating, comment }) => {
  const res = await api.post('/reviews', { courseId, rating, comment })
  return res.data.review
})

const slice = createSlice({
  name: 'reviews',
  initialState: { lastCreated: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createReview.fulfilled, (state, action) => {
      state.lastCreated = action.payload
    })
  }
})

export default slice.reducer


