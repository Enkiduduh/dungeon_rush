import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hero: "",
  enemy: "",
  gameStart: false,
};

const parametersSlice = createSlice({
  name: 'parameters',
  initialState,
  reducers: {
    setHero: (state, action) => {
      state.hero = action.payload;
    },
    setEnemy: (state, action) => {
      state.enemy = action.payload;
    },
    setGameStart: (state, action) => {
      state.gameStart = action.payload;
    },

  },
});

export const { setHero,
  setEnemy,
  setGameStart,
} = parametersSlice.actions;
export default parametersSlice.reducer;
