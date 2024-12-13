import React from "react";

interface User {
  name: {
    first: string;
    last: string;
  };
}

interface UserListProps {
  hasError: boolean;
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ hasError, users }) => {
  if (hasError) {
    throw new Error("No users available");
  }

  console.log({ hasError });

  return (
    <>
      {!users.length ? (
        <div>No users available to display.</div>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.name.first} {user.name.last}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default UserList;
