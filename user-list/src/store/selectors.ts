import { createSelector } from "reselect";
import { RootState } from "./store";

export const selectFilteredUsers = createSelector(
  [(state: RootState) => state.users, (state: RootState) => state.filters],
  (users, filters) => {
    return users.filter((user) => {
      const { firstName, lastName, city, gender, age } = filters;
      const matchesFirstName =
        !firstName ||
        user.name.first.toLowerCase().includes(firstName.toLowerCase());
      const matchesLastName =
        !lastName ||
        user.name.last.toLowerCase().includes(lastName.toLowerCase());
      const matchesCity =
        !city || user.location.city.toLowerCase().includes(city.toLowerCase());
      const matchesGender =
        !gender || user.gender.toLowerCase() === gender.toLowerCase();
      const matchesAge = !age || user.dob.age === parseInt(age, 10);

      return (
        matchesFirstName &&
        matchesLastName &&
        matchesCity &&
        matchesGender &&
        matchesAge
      );
    });
  }
);
