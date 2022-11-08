import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../styles/layout/pagewrapper.css";

import ShiftLog from "../pages/ShiftLog";

export default function PageWrapper() {
  return (
    <div className="container-fluid page-wrapper p-1">
      <Routes>
        <Route path="main" element={<ShiftLog />} />
      </Routes>
    </div>
  );
}
