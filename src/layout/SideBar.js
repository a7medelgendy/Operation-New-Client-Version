import React from "react";
import SideBarButtonList from "./SideBarButtonsList";
import "../styles/layout/sidebar.css";

export default function SideBar() {
  return (
    <div className="container-fluid sidebar d-flex flex-column">
      <div className="row sidebar-logo-container">
        <img src={require("../assets/logo.png")} alt="the logo"/>
      </div>

      <div className="d-flex sidebar-buttons-container flex-grow-1 ">
        <SideBarButtonList />
      </div>
    </div>
  );
}
