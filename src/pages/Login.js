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
import { baseUrl } from "../shared/staticData";
import user from "../shared/user";
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
      url: baseUrl + "/api/login",
      data: { userName: states.userName, password: states.password },
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((res) => {
        //handle success
        if ((res.status = 200)) {
          user.login(res.data.result);
          return navigate("app/dashboard");
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
      <div className="Parent">
        <div className="child1">
        </div>
        <div className="child2 d-flex  flex-column justify-content-center align-items-center">
          <div className="d-flex flex-column ">
            <div className="signin-icon-parent">
              <svg className="signin-icon-child" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="LockOutlinedIcon"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z">
              </path>
              </svg>
            </div>
            <h2 className="css-zq6grw">Sign In</h2>
          </div>
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
              Sign In
            </Button>
          </div>
          <p className="copyRight">Copyright © ANRPC SoftWare Engineering Department</p>
        </div>



        {/* <div className="row login-form-row">
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
            </div> */}
      </div>
    </Form>
  );
}

export default function Login() {
  return (
    <div className="row login-container justify-content-center align-items-center">
      <ToastProvider>
        <Paper className="login-form-wrapper" elevation={3}>
          <LoginFormToast />
        </Paper>
      </ToastProvider>
    </div>
  );
}
