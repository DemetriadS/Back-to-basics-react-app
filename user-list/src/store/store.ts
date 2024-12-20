import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  name: {
    first: string;
    last: string;
  };
  location: {
    city: string;
  };
  gender: string;
  dob: {
    age: number;
  };
}

interface Filters {
  firstName: string;
  lastName: string;
  city: string;
  gender: string;
  age: string;
}

interface AppState {
  users: User[];
  filters: Filters;
  setUsers: (users: User[]) => void;
  updateFilter: (key: string, value: string) => void;
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      users: [],
      filters: {
        firstName: "",
        lastName: "",
        city: "",
        gender: "",
        age: "",
      },
      setUsers: (users) =>
        set(() => ({
          users,
        })),
      updateFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),
    }),
    {
      name: "appState", // The name of the Key found in localStorage
    }
  )
);

export default useAppStore;
