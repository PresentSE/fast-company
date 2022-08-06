import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort((selectedSort) => ({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            }));
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        {columns[column].name}
                        <i
                            className={
                                (selectedSort.path === columns[column].path &&
                                selectedSort.order === "asc"
                                    ? "bi bi-caret-down-fill"
                                    : "") ||
                                (selectedSort.path === columns[column].path &&
                                selectedSort.order === "desc"
                                    ? "bi bi-caret-up-fill"
                                    : "")
                            }
                        ></i>
                    </th>
                ))}
                {/*               <th onClick={() => handleSort("name")} scope="col">
                    Имя
                </th>
                <th scope="col">Качества</th>
                <th onClick={() => handleSort("profession.name")} scope="col">
                    Профессия
                </th>
                <th onClick={() => handleSort("completedMeetings")} scope="col">
                    Встретился, раз
                </th>
                <th onClick={() => handleSort("rate")} scope="col">
                    Оценка
                </th>
                <th onClick={() => handleSort("bookmark")} scope="col">
                    Избранное
                </th>
                <th /> */}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
