import { Button } from "@mui/material";
import React from "react";
import "../layout/styles/sidebar.css";

export default function SideBarButton(props) {
  const currStyle = props.isActive ? "sidebar-button-active" :"sidebar-button-inactive"

  return (
    <div className="container-fluid">
      <Button
        className={"sidebar-button " + currStyle}
        variant="text"
        onClick={() => {
          props.callBack(props.id)
        }}
      >
        <div className="container-fluid" style={{ height: "100%" }}>
          <div className="row" style={{ height: "100%" }}>
            <div className="col-1 d-flex justify-content-center align-items-center">
              {props.startIcon}
            </div>
            <div className="col d-flex justify-content-start align-items-center" style={{ marginLeft: "20px" }}>
              <span>{props.buttonName}</span>
            </div>
          </div>
        </div>
      </Button>
    </div>
  );
}
