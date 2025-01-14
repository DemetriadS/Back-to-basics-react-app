import React, { useState, useEffect, Suspense, useTransition } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  RootState,
  AppDispatch,
  setUsers,
  updateFilter,
} from "../../store/store.ts";
import { selectFilteredUsers } from "../../store/selectors.ts";
import ErrorBoundaryComponent from "./ErrorBoundary.tsx";
import "./App.css";
import ProfilerComponent from "./AppProfiler.tsx";
import Filters from "./FilterInputs.tsx";
import { API_URL, LOADING_TEXT, TITLE } from "../../utils/constants.ts";
import { useDataFetch } from "../../hooks/useDataFetch.ts";
import { User } from "../../types/index.ts";

const UserList = React.lazy(() => import("../UserList/UserList.tsx"));

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filters } = useSelector((state: RootState) => state);
  const [startTransition] = useTransition();
  const [profileLoaded, setProfileLoaded] = useState<boolean>(false);

  const { data, error, loading } = useDataFetch<{ results: User[] }>(API_URL);
  console.log(data, error, loading);

  useEffect(() => {
    if (loading) {
      setProfileLoaded(false);
    } else {
      setProfileLoaded(true);
    }

    if (data && data.results) {
      dispatch(setUsers(data.results));
    }
  }, [data, error, loading, dispatch]);

  const filteredUsers = useSelector((state: RootState) =>
    selectFilteredUsers(state)
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    startTransition(() => {
      dispatch(updateFilter({ key: name, value }));
    });
  };

  return (
    <ProfilerComponent
      id="App"
      users={data?.results || []}
      hasError={error}
      profileLoaded={profileLoaded}
    >
      <h1>{TITLE}</h1>
      <div className="App">
        <Filters filters={filters} onFilterChange={handleFilterChange} />
        <Suspense fallback={<h2>{LOADING_TEXT.LOADING}</h2>}>
          <ErrorBoundaryComponent>
            <UserList hasError={error} users={filteredUsers} />
          </ErrorBoundaryComponent>
        </Suspense>
      </div>
    </ProfilerComponent>
  );
};

export default App;
