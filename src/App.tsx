import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoute from "./Config/publicRoutes";
import PrivateRoute from "./Config/privateRoutes";

import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Dashboard from "./Dashboard/Dashboard";
import Editor from "./Editor/Editor";
import UserSettings from "./UserSettings/UserSettings";
import InvitePage from "./InvitePage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={
                            <PublicRoute>
                                <Home />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/register"
                        element={
                            <PublicRoute>
                                <Register />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/editor"
                        element={
                            <PrivateRoute>
                                <Editor />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/usersettings"
                        element={
                            <PrivateRoute>
                                <UserSettings />
                            </PrivateRoute>
                        }
                    />
                    <Route
                         path="invite"
                         element={
                             <PublicRoute>
                                <InvitePage />
                            </PublicRoute>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

