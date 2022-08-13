import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
// import UserPage from "./components/userPage.jsx";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId" component={Users} />
                <Route path="/users" component={Users} />
            </Switch>
        </>
    );
}

export default App;
