import React from "react";
import { useNavigate } from "react-router-dom";
import SideBarButton from "../components/sidebar/SideBarButton";
import "../styles/layout/sidebar.css";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export default function SideBarButtonList() {
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const navigate = useNavigate();
  const SideBarList = [
    {
      name: "Dashboard",
      icon: <DashboardRoundedIcon style={{ marginLeft: "30px" }} />,
      callBack: (id) => {
        setActiveIndex(id);
        navigate("manola");
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
        navigate("main");
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
      <div className="row sidebar-button-container mt-auto">
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
    </div>
  );
}
