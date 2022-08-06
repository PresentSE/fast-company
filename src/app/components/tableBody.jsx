import React from "react";
import Proptypes from "prop-types";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
    return (
        <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                    {Object.keys(columns).map((column) => (
                        <td key={column}>
                            {_.get(item, columns[column].path)}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

TableBody.propTypes = {
    data: Proptypes.array.isRequired,
    columns: Proptypes.object.isRequired
};

export default TableBody;
