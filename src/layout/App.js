import React from "react";
import "./styles/app.css";
import SideBar from "./SideBar";
import Container from "./Container";
import { Paper } from "@mui/material";

export default function App() {
  return (
    <div className="container-fluid container-style  d-flex flex-column">
      <div className="row container-row">
        <div className="sidebar-style">
          <SideBar />
        </div>
        <div className="col p-0">
          <div className="page-wrapper-container">
            <Container />
          </div>
        </div>
      </div>
    </div>
  );
}
// https://www.codeply.com/p/Bad8Wvri2P