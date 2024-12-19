import React, { useState, useEffect, Suspense, useTransition } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch, setUsers, updateFilter } from "./store.ts";
import ErrorBoundaryComponent from "./ErrorBoundaryComponent.tsx";
import "./App.css";
import ProfilerComponent from "./Profiler.tsx";

const UserList = React.lazy(() => import("./UserList.tsx"));

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, filters } = useSelector((state: RootState) => state);
  const [isPending, startTransition] = useTransition();
  const [hasError, setHasError] = useState<boolean>(false);
  const [profileLoaded, setProfileLoaded] = useState<boolean>(false);

  useEffect(() => {
    setHasError(false);
    fetch("https://randomuser.me/api/?results=10&nat=us")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        return response.json();
      })
      .then((data) => {
        setProfileLoaded(true);
        dispatch(setUsers(data.results));
      })
      .catch(() => {
        setHasError(true);
        setProfileLoaded(true);
        console.error("Error fetching data");
      });
  }, [dispatch]);
  console.log({ users });

  const filteredUsers = users.filter((user) => {
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

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    startTransition(() => {
      dispatch(updateFilter({ key: name, value }));
    });
  };

  return (
    <ProfilerComponent
      id="App"
      users={users}
      hasError={hasError}
      profileLoaded={profileLoaded}
    >
      <h1>User List</h1>
      <div className="App">
        <div className="filters">
          <input
            type="text"
            name="firstName"
            value={filters.firstName}
            onChange={handleFilterChange}
            placeholder="Filter by first name"
          />
          <input
            type="text"
            name="lastName"
            value={filters.lastName}
            onChange={handleFilterChange}
            placeholder="Filter by last name"
          />
          <input
            type="text"
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            placeholder="Filter by city"
          />
          <input
            type="text"
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
            placeholder="Filter by gender"
          />
          <input
            type="number"
            name="age"
            value={filters.age}
            onChange={handleFilterChange}
            placeholder="Filter by age"
          />
        </div>
        {isPending && <div>Updating list...</div>}
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundaryComponent>
            <UserList hasError={hasError} users={filteredUsers} />
          </ErrorBoundaryComponent>
        </Suspense>
      </div>
    </ProfilerComponent>
  );
};

export default App;
