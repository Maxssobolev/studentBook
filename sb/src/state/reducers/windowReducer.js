import { createSlice } from '@reduxjs/toolkit'


const windowReducer = createSlice({
  name: 'window',
  initialState: {
    isMobile: undefined,
  },
  reducers: {
    setMobile(state, action) {
      state.isMobile = action.payload
    },

  }
})

const { reducer, actions } = windowReducer
export const {
  setMobile
} = actions

export default reducer
