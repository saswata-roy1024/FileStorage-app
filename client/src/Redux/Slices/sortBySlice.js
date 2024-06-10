import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 'date',
}

export const sortBySlice = createSlice({
    name: 'sortBy',
    initialState,
    reducers: {
        setSortBy: (state, action) => {
        state.value = action.payload
      },
    },
  })

  export const { setSortBy } = sortBySlice.actions
  
  export default sortBySlice.reducer
