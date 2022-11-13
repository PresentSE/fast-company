import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import AppLoader from "./components/ui/hoc/appLoader";
import NavBar from "./components/ui/navBar";
import AuthProvider from "./hooks/useAuth";
import Login from "./layouts/login";
import LogOut from "./layouts/logOut";
import Main from "./layouts/main";
import Users from "./layouts/users";

function App() {
    return (
        <div>
            <AppLoader>
                <AuthProvider>
                    <NavBar />
                    <Switch>
                        <ProtectedRoute
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/logout" component={LogOut} />
                        <Route path="/" exact component={Main} />
                        <Redirect to="/" />
                    </Switch>
                </AuthProvider>
            </AppLoader>
            <ToastContainer />
        </div>
    );
}

export default App;
