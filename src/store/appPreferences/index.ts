import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/* It is a Redux slice file. A slice means:
  One named piece of the global Redux store, plus the rules for changing that piece.
  In this case, the slice is called appPreferences, and it controls "state.appPreferences" 
  part of Redux state. */ 

// State Type. This describes the shape of this slice's state.
interface AppPreferencesState {
  selectedCity: string;
  selectedDepartment: string;
}

/* This is the default value before the user changes anything.
When the app starts, Redux initializes:
  
  state.appPreferences = {
    selectedCity: "minsk",
    selectedDepartment: "reception",
  } */ 
const initialState: AppPreferencesState = {
  selectedCity: "minsk",
  selectedDepartment: "reception",
};

/* This file creates three things:
  - initial state
  - actions
  - reducer */
const appPreferencesSlice = createSlice({
  name: "appPreferences", // name used in general Redux action types
  initialState, // starting state for this slice
  reducers: { // functions that describe allowed state changes
    /* Means When someone dispathces setSelectedCity("brest"), update state.selectedCity to "brest" 
    This loooks like mutation: state.selectedCity = action.payload 
    Mentally we can read it as:
    
      return {
        ...state,
        selectedCity: action.payload,
      }; */
    setSelectedCity: (state, action: PayloadAction<string>) => {
      state.selectedCity = action.payload;
    },
    setSelectedDepartment: (state, action: PayloadAction<string>) => {
      state.selectedDepartment = action.payload;
    },
  },
});

// export actions
export const { setSelectedCity, setSelectedDepartment } = appPreferencesSlice.actions;
// export Reducer
export default appPreferencesSlice.reducer;

/* Full Data Flow:

PatientsPage
    |
    | dispatch(setSelectedCity("brest"))
    v
setSelectedCity action 
    |  An action is a plain object that describes what happened in the app.
    |  In Redux, state is not changed directly from a component. A component sends an action
    |     to Redux, and Redux decides how state should change.
    |
    | type: "appPreferences/setSelectedCity"  --> what happened
    | payload: "brest"                        --> data needed for that change
    v
appPreferences reducer
    |
    | state.selectedCity = action.payload
    v
Redux store
    |
    v
state.appPreferences.selectedCity = "brest"    

*/
