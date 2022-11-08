import React from "react";
import "../styles/layout/container.css";
import AppBar from "./AppBar";
import PageWrapper from "./PageWrapper";

export default function Container() {
  return (
    <div className="container-fluid main-section-container">
      {/* <div className="row p-3 appbar-container">
        <AppBar />
      </div> */}
      <div className="row pt-0 pl-3 pr-3 pb-3" >
        <PageWrapper />
      </div>
    </div>
  );
}
