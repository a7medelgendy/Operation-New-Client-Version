import React, { useState, useEffect } from "react";
import "../styles/layout/app.css";
import SideBar from "./SideBar";
import Container from "./Container";
import { Navigate } from "react-router-dom";
import user from "../shared/user";
import NavBar from "./NavBar";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  useEffect(() => {
  }, [isSidebarOpen]);

  if (!user.isLoggedIn()) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container-fluid container-style">

      <div className="container-style d-flex">
        <div className={`sidebar-style ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <SideBar />
        </div>
        <div className="col p-0">
          <NavBar onToggleSidebar={toggleSidebar} />
          <div className="page-wrapper-container" style={{ backgroundColor: "rgb(239 218 218 / 9%) !important" }}>
            <Container />
          </div>
        </div>
      </div>
    </div>
  );
}
