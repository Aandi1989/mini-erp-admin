import { configureStore } from "@reduxjs/toolkit";
/* These are React hooks for working with Redux:
    - useDispatch sends actions to Redux
    - useSelector reads data from Redux */ 
import { useDispatch, useSelector } from "react-redux";

/* it means  appPreferencesReducer from src/store/appPreferences/index.ts*/
import appPreferencesReducer from "./appPreferences";
import servicesReducer from "./services";

/* This file answer one question:
What global Redux state exists in our app, and how do React components access it safely?

We need to think about it like this:
Redux store
├── appPreferences
│   ├── selectedCity
│   └── selectedDepartment
│
└── services
    ├── items
    ├── isLoading
    └── errorMessage
*/ 

export const store = configureStore({
  /* We are saying:  The global Redux state has two sections: appPreferences and services.
  The keys are important: appPreferences, services. These names become keys in the global Redux state.
  Later, components can read them like this:
    state.appPreferences.selectedCity
    state.services.items
    state.services.isLoading

  A slice owns one part of the global Redux state.
  A reducer knows how to update that part.
  (appPreferencesReducer and  servicesReducer are reducers)
  */ 
  reducer: {
    // means: Put the state managed by appPreferencesReducer under state.appPreferences
    appPreferences: appPreferencesReducer,
    services: servicesReducer,
  },
});


/* RootState means: The full shape of the Redux state
In our app it is roughly: 

type RootState = {
  appPreferences: {
    selectedCity: string;
    selectedDepartment: string;
  };
  services: {
    items: ServiceListItem[];
    isLoading: boolean;
    errorMessage: string;
  };
};  
But we do not write this manually. TypeScript derives it from the real store. */
export type RootState = ReturnType<typeof store.getState>;
// AppDispatch means: The correct dispatch function type for this store.
export type AppDispatch = typeof store.dispatch;


/* These are project-specific Redux hooks. 
Instead of using raw hooks:
  useDispatch()
  useSelector() 
We use typed hook versions:
  useAppDispatch()
  useAppSelector */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
