import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../styles/layout/pagewrapper.css";

import ShiftLog from "../pages/ShiftLog";
import Dashboard from "../pages/Dashboard";


export default function PageWrapper() {
  return (
    <div className="container-fluid page-wrapper p-1">
      <Routes>
        <Route path="shiftlog" element={<ShiftLog />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
