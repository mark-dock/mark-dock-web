import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/">
              <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}
