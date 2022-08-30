import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ options, name, onChange, value }) => {
    return (
        <div className="mb-4">
            <div className="form-check form-check-inline">
                <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="option1"
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                    1
                </label>
            </div>
        </div>
    );
};

export default RadioField;

RadioField.propTypes = {
    options: PropTypes.array,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
};
