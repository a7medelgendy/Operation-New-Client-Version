import "../styles/login.css";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Paper,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import TextFieldValidator from "../components/form/TextfieldValidator";
import Form from "../components/form/form";

function LoginFormToast() {
  const [checked, setChecked] = React.useState(true);
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const navigate = useNavigate();
  const { addToast } = useToasts();

  const checkLoginCreditional = () => {
    axios({
      method: "post",
      url: "/api/login",
      data: { userName: userName, password: password },
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((res) => {
        //handle success
        if ((res.status = 200)) {
          return navigate("app", { state: { id: 1, name: userName } });
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
      <div className="container-fluid login-form-container d-flex flex-column">
        <div className="row p-4">
          <h2>Operator Login</h2>
        </div>

        <div className="row p-4">
          <TextFieldValidator
            className="inputRounded"
            variant="outlined"
            label={userName == "" ? "" : "Username"}
            value={userName}
            placeholder="Username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            setFieldState={setUserName}
            style={{ width: "307px", height: "47px" }}
            validation_rules={[{ rule: "isRequired" }]}
            validation_messages={["Username is required"]}
          />
        </div>
        <div className="row p-4">
          <TextFieldValidator
            className="inputRounded"
            label={password == "" ? "" : "Password"}
            placeholder="Password"
            type={"password"}
            value={password}
            setFieldState={setPassword}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            // endAdornment={
            //   <InputAdornment position="end">
            //     <IconButton aria-label="toggle password visibility" edge="end">
            //       <Visibility />
            //     </IconButton>
            //   </InputAdornment>
            // }
            style={{ width: "307px", height: "47px" }}
            validation_rules={[{ rule: "isRequired" }]}
            validation_messages={["Password is required"]}
          />
        </div>
        <div className="row p-2 mb-4">
          <Button
            type="submit"
            variant="contained"
            className="m-2"
            style={{
              width: "307px",
              height: "47px !important",
              borderRadius: "50px",
              backgroundColor: "#5955B3",
            }}
          >
            Log In
          </Button>
        </div>
        <div className="row p-2 mb-4">
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleChange}
                label={"Keep me logged in"}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label="Keep me logged in"
          />
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
