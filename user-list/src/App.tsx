import React, { useState, useEffect, Suspense, useTransition } from "react";
import ErrorBoundaryComponent from "./ErrorBoundaryComponent.tsx";
import "./App.css";
import ProfilerComponent from "./Profiler.tsx";

const UserList = React.lazy(() => import("./UserList.tsx"));

const App: React.FC = () => {
  const [users, setUsers] = useState<[]>([]);
  const [filter, setFilter] = useState<string>("");
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
        setUsers(data.results);
      })
      .catch(() => {
        setHasError(true);
        setProfileLoaded(true);
        console.error("Error fetching data");
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.first.toLowerCase().startsWith(filter.toLowerCase())
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setFilter(event.target.value);
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
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filter by name"
        />
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
