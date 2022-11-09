import React from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import "../../styles/modal/form-title-modal.css";

export default function FormModalTitle(props) {
  return (
    <AppBar className="app-bar">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={props.onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" className="title">
          {props.title}
        </Typography>
        <Button autoFocus color="inherit" onClick={props.onSubmit}>
          save
        </Button>
      </Toolbar>
    </AppBar>
  );
}
