import { configureStore } from "@reduxjs/toolkit"
import unitReducer from "./features/unit/unitSlice.js"
export const store = configureStore({
  reducer: {
    unit: unitReducer
  }
})