import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";
import Loader from "../../common/loader";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQualities } = useQualities();
    if (!isLoading) {
        return (
            <>
                {qualities.map((qual) => (
                    <Quality key={qual._id} {...getQualities(qual)} />
                ))}
            </>
        );
    } else {
        return <Loader />;
    }
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
