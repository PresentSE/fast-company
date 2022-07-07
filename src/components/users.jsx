import React, { useState } from "react";
import API from "../api";

const Users = () => {
  const [users, setUsers] = useState(API.users.fetchAll());
  console.log(users);
  const handleDelete = (userId) => {};
  const renderPhrase = (number) => {};
  const renderTableHead = () => {
    return (
      <tr>
        <th scope="col">Имя</th>
        <th scope="col">Качества</th>
        <th scope="col">Профессия</th>
        <th scope="col">Встретился, раз</th>
        <th scope="col">Оценка</th>
        <th scope="col"></th>
      </tr>
    );
  };

  const renderUsers = () => {
    return (
      users.length !== 0 &&
      users.map((user) => (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>
            {user.qualities.map((qualities) => {
              return (
                <span
                  key={qualities._id}
                  className={`badge bg-${qualities.color} m-1`}
                >
                  {qualities.name}
                </span>
              );
            })}
          </td>
          <td>{user.profession.name}</td>
          <td>{user.completedMeetings}</td>
          <td>{user.rate} /5</td>
          <td>
            <button type="button" className="btn btn-danger btn-sm m-2">
              delete
            </button>
          </td>
        </tr>
      ))
    );
  };

  return (
    <>
      <table className="table">
        <thead>{renderTableHead()}</thead>
        <tbody>{renderUsers()}</tbody>
      </table>
    </>
  );
};

export default Users;
