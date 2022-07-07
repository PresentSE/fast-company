import React, { useState } from "react";
import API from "../api";

const Users = () => {
  const [users, setUsers] = useState(API.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((users) => users !== userId));
  };

  const renderPhrase = (number) => {
    let phrase =
      number >= 5 || number === 1
        ? "Человек тусанет c тобой сегодня"
        : "Человека тусанут с тобой сегодня";
    return (
      <h3>
        <span key="number" className="badge m-2 bg-primary">
          {number} {phrase}
        </span>
      </h3>
    );
  };
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
    return users.map((user) => (
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
          <button
            type="button"
            className="btn btn-danger btn-sm m-2"
            onClick={() => handleDelete(user)}
          >
            delete
          </button>
        </td>
      </tr>
    ));
  };

  if (users.length === 0) {
    return (
      <h3>
        <span key="number" className="badge m-2 bg-danger">
          Никто с тобой не тусанет
        </span>
      </h3>
    );
  }
  return (
    <>
      {renderPhrase(users.length)}
      <table className="table">
        <thead>{renderTableHead()}</thead>
        <tbody>{renderUsers()}</tbody>
      </table>
    </>
  );
};

export default Users;
