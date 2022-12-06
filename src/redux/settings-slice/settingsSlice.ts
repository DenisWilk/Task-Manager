import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// language indexes: EN=0, UA=1, BY=2, RU=3;

type ISettingsState = {
  languageIndex: number;
  themeIndex: string;
};

const settingsState: ISettingsState = {
  languageIndex: 0,
  themeIndex: 'light',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: settingsState,
  reducers: {
    setLanguage(state, action: PayloadAction<number>): void {
      state.languageIndex = action.payload;
    },
    setTheme(state, action: PayloadAction<string>): void {
      state.themeIndex = action.payload;
    },
  },
});

export const { setLanguage, setTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
