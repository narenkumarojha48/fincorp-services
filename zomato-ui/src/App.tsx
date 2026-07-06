import { useState } from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import PublicRoutes from "./components/PublicRoutes";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";
import Login from "./pages/Login";
import SelectRole from "./pages/SelectRole";
import "./App.css";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />}></Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/select-role" element={<SelectRole />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
