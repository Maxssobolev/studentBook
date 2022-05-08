import { createSlice } from '@reduxjs/toolkit'


const windowReducer = createSlice({
  name: 'window',
  initialState: {
    isMobile: false,
  },
  reducers: {
    setMobile(state, action) {
      state.isMobile = true
    },
    setDesktop(state, action) {
      state.isMobile = false
    }

  }
})

const { reducer, actions } = windowReducer
export const {
  setMobile,
  setDesktop
} = actions

export default reducer
