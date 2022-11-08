import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Checkbox,
  FormControlLabel,
  Paper,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { ToastProvider, useToasts } from "react-toast-notifications";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import "../styles/login/login.css";
import {baseUrl} from "../shared/staticData";

import TextFieldValidator from "../components/form/TextfieldValidator";
import Form from "../components/form/form";

function LoginFormToast() {
  const [states, setStates] = React.useState({
    userName: "",
    password: "",
    checked: true,
    showPassword: false,
  });

  const handleChange = (prop) => (value) => {
    setStates({ ...states, [prop]: value });
  };

  const triggerCheck = () => {
    handleChange("showPassword")(!states.showPassword);
  };
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const checkLoginCreditional = () => {
    axios({
      method: "post",
      url: baseUrl+"/api/login",
      data: { userName: states.userName, password: states.password },
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((res) => {
        //handle success
        if ((res.status = 200)) {
          return navigate("app", { state: { id: 1, name: states.userName } });
        } else {
          addToast(" Error user name or password", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 2000,
          });
        }
      })
      .catch(() => {
        addToast(" Error user name or password", {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
      });
  };

  return (
    <Form onSubmit={checkLoginCreditional}>
      <div className="container-fluid login-form-container">
        <div className="row login-form-title-container">
          <h2>Login</h2>
        </div>
        <div className="row">
          <div className="container-fluid">
            <div className="row login-form-row">
              <TextFieldValidator
                className="login-input-rounded login-input"
                variant="outlined"
                label={states.userName == "" ? "" : "Username"}
                value={states.userName}
                placeholder="Username"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonRoundedIcon />
                    </InputAdornment>
                  ),
                }}
                setFieldState={handleChange("userName")}
                validation_rules={[{ rule: "isRequired" }]}
                validation_messages={["Username is required"]}
              />
            </div>
            <div className="row login-form-row">
              <TextFieldValidator
                className="login-input-rounded login-input"
                label={states.password == "" ? "" : "Password"}
                placeholder="Password"
                type={states.showPassword ? "text" : "password"}
                value={states.password}
                setFieldState={handleChange("password")}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRoundedIcon />
                    </InputAdornment>
                  ),

                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={triggerCheck}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {states.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                validation_rules={[{ rule: "isRequired" }]}
                validation_messages={["Password is required"]}
              />
            </div>
            <div className="row login-form-row">
              <Button
                type="submit"
                variant="contained"
                className="login-btn"
                size="small"
              >
                Log In
              </Button>
            </div>
            <div className="row login-form-row">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={states.checked}
                    onChange={(e) => handleChange("checked")(e.target.checked)}
                    label={"Keep me logged in"}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                }
                label="Keep me logged in"
              />
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default function Login() {
  return (
    <div className="container-fluid">
      <div className="row login-container justify-content-center align-items-center">
        <ToastProvider>
          <Paper className="login-form-wrapper" elevation={3}>
            <LoginFormToast />
          </Paper>
        </ToastProvider>
      </div>
    </div>
  );
}
