import React from "react";
import PropTypes from "prop-types";
import { useProfessions } from "../../hooks/useProfession";
import Loader from "../common/loader";

const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfessions();
    const prof = getProfession(id);
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
