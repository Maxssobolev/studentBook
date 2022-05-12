import { createSlice } from '@reduxjs/toolkit'


const modalsReducer = createSlice({
  name: 'modals',
  initialState: {
    fullTimeTable: {
      isOpen: false
    }
  },
  reducers: {
    setFullTimeTable(state, action) {
      state.fullTimeTable.isOpen = action.payload
    },

  }
})

const { reducer, actions } = modalsReducer
export const {
  setFullTimeTable
} = actions

export default reducer
