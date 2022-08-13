import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserList = ({ name, id }) => {
    return (
        <>
            <Link key={id} to={`users/${id}`}>
                {name}
            </Link>
        </>
    );
};

UserList.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default UserList;
