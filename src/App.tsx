import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Dashboard from "./Dashboard/Dashboard";
import Register from "./Register/Register";
import PublicRoute from "./Config/publicRoutes";
import PrivateRoute from "./Config/privateRoutes";

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
          </Route>
        </Routes>
      </BrowserRouter>
  );
}
