import React from "react";

const BookMark = ({ status, ...rest }) => {
    // console.log(rest);
    return (
        <button {...rest}>
            <i
                className={
                    "bi bi-suit-heart" + (status === true ? "-fill" : "")
                }
            ></i>
        </button>
    );
};

export default BookMark;
