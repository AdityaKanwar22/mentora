import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import coursesReducer from './slices/coursesSlice'
import reviewsReducer from './slices/reviewsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    reviews: reviewsReducer,
  },
})

export default store


