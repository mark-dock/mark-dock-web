import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoute from "./Config/publicRoutes";
import PrivateRoute from "./Config/privateRoutes";

import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Dashboard from "./Dashboard/Dashboard";
import Editor from "./Editor/Editor";
import UserSettings from "./Settings/User";
import InvitePage from "./InvitePage";
import OrgSettings from "./Settings/OrgSettings";

export default function App() {
    return (
        <div className="bg-scheme-100 min-h-screen">
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
                            path="/editor/:documentId"
                            element={
                                <PrivateRoute>
                                    <Editor />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/invite"
                            element={
                                <PublicRoute>
                                    <InvitePage />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/settings/*"
                            element={
                                <PrivateRoute>
                                    <Routes>
                                        <Route path="user" element={<UserSettings />} />
                                        <Route path="organization/:orgId" element={<OrgSettings />} />
                                    </Routes>
                                </PrivateRoute>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
