import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Dashboard from "./Dashboard/Dashboard";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/">
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}
