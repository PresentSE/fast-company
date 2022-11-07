import React from "react";
import PropTypes from "prop-types";
import Loader from "../common/loader";
import { useSelector } from "react-redux";
import {
    getProfessionById,
    getProfessionsLoadingStatus
} from "../../store/professions";

const Profession = ({ id }) => {
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const prof = useSelector(getProfessionById(id));
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else {
        return <Loader />;
    }
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
