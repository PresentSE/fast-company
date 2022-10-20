import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";
import Loader from "../../common/loader";

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities();
    if (isLoading) return <Loader />;
    return (
        <>
            {qualities.map((qual) => (
                <Quality key={qual} id={qual} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
