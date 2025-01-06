import React from "react";
import "./UserList.css";
import { UserListProps } from "../../types";

const UserList: React.FC<UserListProps> = ({ hasError, users }) => {
  if (hasError) {
    throw new Error("No users available");
  }

  return (
    <>
      {!users.length ? (
        <div>No users available to display.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
              <th>Gender</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.city}</td>
                <td>{user.gender}</td>
                <td>{user.dob.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserList;
