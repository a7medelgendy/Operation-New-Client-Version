import React from "react";
import "../styles/layout/app.css";
import SideBar from "./SideBar";
import Container from "./Container";
import { Paper } from "@mui/material";
import { Navigate } from "react-router-dom";

import user from "../shared/user";

export default function App() {
  if (!user.isLoggedIn()) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container-fluid container-style">
      <div className="row container-row">
        <div className="sidebar-style">
          <SideBar />
        </div>
        <div className="col p-0">
          <div className="page-wrapper-container" style={{ backgroundColor: "rgb(239 218 218 / 9%) !important" }}>
            <Container />
          </div>
        </div>
      </div>
    </div>
  );
}
// https://www.codeply.com/p/Bad8Wvri2P
