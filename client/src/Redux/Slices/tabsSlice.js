import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 'My Files',
}

export const tabsSlice = createSlice({
    name: 'tabs',
    initialState,
    reducers: {
        setTabs: (state, action) => {
        state.value = action.payload
      },
    },
  })

  export const { setTabs } = tabsSlice.actions
  
  export default tabsSlice.reducer

  