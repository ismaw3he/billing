import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Modal from "react-modal";

import AdminLoginPage from "./components/pages/AdminLoginPage/AdminLoginPage";
import UserLoginPage from "./components/pages/UserLoginPage/UserLoginPage";
import LoginWrapper from "./components/loginWrapper";
import AdminHome from "./components/pages/AdminHome/AdminHome";
import UserHome from "./components/pages/UserHome/UserHome";
Modal.setAppElement("#root");
function App() {
    return (
        <Router>
        <UserHome />
        </Router>
            // {/*<Router>*/}
            // {/*<div className="App">*/}
            // {/*    <Switch>*/}
            // {/*        <Route path="/admin" exact>*/}
            // {/*            <AdminLoginPage/>*/}
            // {/*        </Route>*/}
            // {/*        <Route path="/login" exact>*/}
            // {/*            <UserLoginPage/>*/}
            // {/*        </Route>*/}
            // {/*        <Route path="/" component={LoginWrapper} exact/>*/}
            // {/*        <Route path="/admin/home" exact>*/}
            // {/*            <AdminHome/>*/}
            // {/*        </Route>*/}
            // {/*        <Route path="/user/home" exact>*/}
            // {/*            <UserHome/>*/}
            // {/*        </Route>*/}
            // {/*    </Switch>*/}
            // {/*</div>*/}
            // {/*</Router>*/}

            );
            }

            export default App;
