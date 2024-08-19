import { createSlice } from '@reduxjs/toolkit';

const namesSlice = createSlice({
  name: 'names',
  initialState: [],
  reducers: {
    setNames: (state, action) => {
      return action.payload;
    },
    createName: (state, action) => {
      state.push(action.payload);
    },
    deleteName: (state, action) => {
      return state.filter((name) => name.id !== action.payload);
    },
    updateName: (state, action) => {
      const { id, name } = action.payload;
      const existingName = state.find((name) => name.id === id);
      if (existingName) {
        existingName.name = name;
      }
    },
  },
});

export const { setNames, createName, deleteName, updateName } = namesSlice.actions;

export default namesSlice.reducer;
