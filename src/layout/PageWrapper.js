import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/pagewrapper.css";

import MANOLA from "../components/MANOLA";
import Login from "../pages/Login";
import Main from "../components/shift_log/Main";
import Test from "../Test";

export default function PageWrapper() {
  return (
    <div className="container-fluid page-wrapper p-1">
      <Routes>
        <Route path="manola" element={<MANOLA />} />
        <Route path="main" element={<Main />} />
      </Routes>
    </div>
  );
}
