import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  users: any[];
  filters: {
    firstName: string;
    lastName: string;
    city: string;
    gender: string;
    age: string;
  };
}

const initialState: AppState = {
  users: [],
  filters: {
    firstName: "",
    lastName: "",
    city: "",
    gender: "",
    age: "",
  },
};

const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<any[]>) {
      state.users = action.payload;
    },
    updateFilter(state, action: PayloadAction<{ key: string; value: string }>) {
      state.filters[action.payload.key] = action.payload.value;
    },
  },
});

export const { setUsers, updateFilter } = userListSlice.actions;

const store = configureStore({
  reducer: userListSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;