import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage/usersListPage";
import UserEdit from "../components/page/editUserPage/userEdit";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    if (edit && userId) {
        return <UserEdit />;
    } else {
        return <>{userId ? <UserPage userId={userId} /> : <UsersListPage />}</>;
    }
};

export default Users;
