import React from "react";
import { useNavigate } from "react-router-dom";
import SideBarButton from "../components/sidebar/SideBarButton";
import "../styles/layout/sidebar.css";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { Avatar } from "@mui/material";

export default function SideBarButtonList() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const navigate = useNavigate();

  const SideBarList = [
    {
      name: "Dashboard",
      icon: <DashboardRoundedIcon style={{ marginLeft: "30px" }} />,
      callBack: (id) => {
        setActiveIndex(id);
        navigate("dashboard");
      },
    },
    {
      name: "Shift Log",
      icon: (
        <PendingActionsIcon
          sx={{ fontSize: 27 }}
          style={{ marginLeft: "30px" }}
        />
      ),
      callBack: (id) => {
        setActiveIndex(id);
        navigate("shiftlog");
      },
    },
  ];

  const SideBarListComponent = SideBarList.map((ele, idx) => {
    return (
      <div className="row sidebar-button-container" key={idx}>
        <SideBarButton
          id={idx}
          buttonName={ele.name}
          startIcon={ele.icon}
          callBack={ele.callBack}
          isActive={activeIndex == idx ? true : false}
        />
      </div>
    );
  });
  return (
    <div className="container-fluid p-0 d-flex flex-column">
      {SideBarListComponent}

      <div className="row sidebar-avatar-container mt-auto">
        <div className="container-fluid d-flex align-items-center sidebar-avatr">
          <div className="col">
            <Avatar
              sx={{
                width: 45,
                height: 45,
                bgcolor: "#D7DAFF",
                color: "#323484",
              }}
            >
              AE
            </Avatar>
          </div>

          <div className="col-9 mt-0 p-2 d-flex align-items-center">
            <span style={{ color: "#D7DAFF", fontSize: "18px" }}>
              Ali.AbdElnabi
            </span>
          </div>
        </div>
      </div>
      <div className="row sidebar-button-container">
        <SideBarButton
          buttonName={"Logout"}
          startIcon={
            <LogoutRoundedIcon
              sx={{ transform: "rotate(180deg) !important" }}
              style={{ marginLeft: "30px" }}
            />
          }
          callBack={() => {
            localStorage.setItem("isLoggedIn", false);
            const loggedInUser = localStorage.getItem("isLoggedIn");
            if (loggedInUser) {
              // const foundUser = JSON.parse(loggedInUser);
              console.log("-----------------");
              console.dir(loggedInUser);
              console.log("-----------------");
            }
            navigate("/");
          }}
          isActive={false}
        />
      </div>
      <div className="row sidebar-button-container">
        <div className="d-flex justify-content-center align-items-center">
          <span style={{ fontSize: "12.5px", color: "#B2F9B2" }}>
            Made By ANRPC IT-Team @2022
          </span>
        </div>
      </div>
    </div>
  );
}
