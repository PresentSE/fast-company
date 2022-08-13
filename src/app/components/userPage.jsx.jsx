import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
import QualitiesList from "./qualitieslist";
import { useHistory } from "react-router-dom";

const UserPage = ({ id }) => {
    const [userFound, setUserFound] = useState();
    const history = useHistory();
    useEffect(() => {
        api.users.getById(id).then((data) => setUserFound(data));
    }, []);

    const handleSave = () => {
        history.push("/users");
    };

    console.log(userFound);
    if (userFound) {
        return (
            <div>
                <h1>{userFound.name}</h1>
                <h2>{`Профессия: ${userFound.profession.name}`}</h2>
                <QualitiesList qualities={userFound.qualities} />
                <h6>{`completedMeetings: ${userFound.completedMeetings}`}</h6>
                <h2>{`Rate: ${userFound.rate}`}</h2>
                <button
                    onClick={() => {
                        handleSave();
                    }}
                >
                    Все пользователи
                </button>
            </div>
        );
    }
    return <h2>Loading...</h2>;
};

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserPage;
