import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Dashboard from "./Dashboard/Dashboard";
import Unauthorized from "./Errors/Unauthorized";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/">
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="401" element={<Unauthorized />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}
