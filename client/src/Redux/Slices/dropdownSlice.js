import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  selectedOptions: {
    all: true,
    image: false,
    video: false,
    audio: false,
    document: false,
  },
};

const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState,
  reducers: {
    toggleDropdown: (state) => {
      state.isOpen = !state.isOpen;
    },
    setOption: (state, action) => {
      const { name, checked } = action.payload;

       if (name === 'all') {
        Object.keys(state.selectedOptions).forEach((key) => {
          state.selectedOptions[key] = checked;
        });
      } else {
        state.selectedOptions[name] = checked;

        if (!checked) {
          state.selectedOptions.all = false;
        } else {
          const allSelected = Object.keys(state.selectedOptions).every(
            (key) => key === 'all' || state.selectedOptions[key]
          );
          if (allSelected) {
            state.selectedOptions.all = true;
          }
        }
      }
    },
    closeDropdown: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleDropdown, setOption, closeDropdown } = dropdownSlice.actions;
export default dropdownSlice.reducer;
