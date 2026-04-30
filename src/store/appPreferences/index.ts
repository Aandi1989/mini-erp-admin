import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AppPreferencesState {
  selectedCity: string;
  selectedDepartment: string;
}

const initialState: AppPreferencesState = {
  selectedCity: "minsk",
  selectedDepartment: "reception",
};

const appPreferencesSlice = createSlice({
  name: "appPreferences",
  initialState,
  reducers: {
    setSelectedCity: (state, action: PayloadAction<string>) => {
      state.selectedCity = action.payload;
    },
    setSelectedDepartment: (state, action: PayloadAction<string>) => {
      state.selectedDepartment = action.payload;
    },
  },
});

export const { setSelectedCity, setSelectedDepartment } = appPreferencesSlice.actions;
export default appPreferencesSlice.reducer;
