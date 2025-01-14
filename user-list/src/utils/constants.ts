export const API_URL = "https://randomuser.me/api/?results=10&nat=us";

export const PLACEHOLDER_TEXTS = {
  age: "Filter by age",
  gender: "Select Gender",
};

export const FILTER_PLACEHOLDERS = {
  firstName: "Filter by firstName",
  lastName: "Filter by lastName",
  city: "Filter by city",
};

export const GENDER_LABEL = "Gender:";

export const GENDER_OPTIONS = [
  { value: "", label: "Select Gender" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export const ERROR_MESSAGES = {
  GENERIC_ERROR: "Something went wrong, don't worry, it is not your fault:",
  FETCH_DATA_ERROR: "Error fetching data",
  NO_USERS_AVAILABLE: "No users available",
  NO_USERS_TO_DISPLAY: "No users available to display.",
};

export const TABLE_HEADERS = {
  FIRST_NAME: "First Name",
  LAST_NAME: "Last Name",
  CITY: "City",
  GENDER: "Gender",
  AGE: "Age",
};

export const LOADING_TEXT = {
  UPDATING_LIST: "Updating list...",
  LOADING: "Loading users list...",
};

export const TITLE = "User List";
