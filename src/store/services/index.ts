import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { ServiceListItem } from "../../mock-api/data";
import ClinicServicesService from "../../services/services";

interface ServicesState {
  items: ServiceListItem[];
  isLoading: boolean;
  errorMessage: string;
}

const initialState: ServicesState = {
  items: [],
  isLoading: false,
  errorMessage: "",
};

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      return await ClinicServicesService.getServices();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue("Failed to load services.");
    }
  },
);

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage =
          typeof action.payload === "string" ? action.payload : "Failed to load services.";
      });
  },
});

export default servicesSlice.reducer;
