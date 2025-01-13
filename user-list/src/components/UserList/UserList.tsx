import React from "react";
import "./UserList.css";
import { UserListProps } from "../../types";
import { ERROR_MESSAGES, TABLE_HEADERS } from "../../utils/constants.ts";

const UserList: React.FC<UserListProps> = ({ hasError, users }) => {
  if (hasError) {
    throw new Error(ERROR_MESSAGES.NO_USERS_AVAILABLE);
  }

  return (
    <>
      {!users.length ? (
        <div>{ERROR_MESSAGES.NO_USERS_TO_DISPLAY}</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>{TABLE_HEADERS.FIRST_NAME}</th>
              <th>{TABLE_HEADERS.LAST_NAME}</th>
              <th>{TABLE_HEADERS.CITY}</th>
              <th>{TABLE_HEADERS.GENDER}</th>
              <th>{TABLE_HEADERS.AGE}</th>
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
