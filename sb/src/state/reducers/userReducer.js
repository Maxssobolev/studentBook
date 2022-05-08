import { createSlice } from '@reduxjs/toolkit'


const userReducer = createSlice({
  name: 'user',
  initialState: {
    isLogged: false,
    userData: null,
    error: '',
    isLoading: false,
  },
  reducers: {
    handleLogout(state, action) {
      state.isLogged = false
      state.userData = null
      state.error = ''
      state.isLoading = false
    }
  },
})

const { reducer, actions } = userReducer
export const {
  handleLogout
} = actions
export default reducer
