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
import {
  API_URL,
  ERROR_MESSAGES,
  LOADING_TEXT,
  TITLE,
} from "../../utils/constants.ts";

const UserList = React.lazy(() => import("../UserList/UserList.tsx"));

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, filters } = useSelector((state: RootState) => state);
  const [isPending, startTransition] = useTransition();
  const [hasError, setHasError] = useState<boolean>(false);
  const [profileLoaded, setProfileLoaded] = useState<boolean>(false);

  useEffect(() => {
    setHasError(false);
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(ERROR_MESSAGES.FETCH_DATA_ERROR);
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
      });
  }, [dispatch]);

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
      users={users}
      hasError={hasError}
      profileLoaded={profileLoaded}
    >
      <h1>{TITLE}</h1>
      <div className="App">
        <Filters filters={filters} onFilterChange={handleFilterChange} />
        {isPending && <div>{LOADING_TEXT.UPDATING_LIST}</div>}
        <Suspense fallback={<div>{LOADING_TEXT.LOADING}</div>}>
          <ErrorBoundaryComponent>
            <UserList hasError={hasError} users={filteredUsers} />
          </ErrorBoundaryComponent>
        </Suspense>
      </div>
    </ProfilerComponent>
  );
};

export default App;
