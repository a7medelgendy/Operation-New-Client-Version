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
import TextFieldValidator from "../components/TextfieldValidator";

function LoginFormToast() {
  const [checked, setChecked] = React.useState(true);
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorFormDetectorCount, setErrorFormDetectorCount] = React.useState(
    {}
  );
  const [error, setError] = React.useState(" Error user name or password");

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const navigate = useNavigate();
  const { addToast } = useToasts();

  const loginClick = (e) => {
    /*axios
        .post("/api/login", { userName: "ahmed", password: "asdfas" })
        .then((res) => {
          console.log(res);
          console.log(res.data);
        });*/
    if (userName == "" || password == "") {
      setError("user name or password is wrong");
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 2000,
      });
      return;
    }

    axios({
      method: "post",
      url: "/api/login",
      data: { userName: userName, password: password },
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (res) {
        //handle success
        if ((res.status = 200)) {
          return navigate("app", { state: { id: 1, name: "sabaoon" } });
        } else {
          setError(" Error user name or password");

          addToast(error, {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 2000,
          });
          return;
        }
      })
      .catch(function (res) {
        //handle error
        setError(" Error user name or password");

        addToast(error, {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
        return;
      });
  };

  return (
    <Paper className="login-form-wrapper" elevation={3}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (Object.keys(errorFormDetectorCount).length > 0) {
            return;
          }
          loginClick();
        }}
      >
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
              setFieldState={(state, isError) => {
                // setErrorFormDetetctor(errorFormDetector.push(errorList));
                console.log(isError);
                if (isError) {
                  var t = JSON.parse(JSON.stringify(errorFormDetectorCount));
                  t.userNameError = 1;
                  setErrorFormDetectorCount(t);
                } else {
                  var t = JSON.parse(JSON.stringify(errorFormDetectorCount));
                  delete t.userNameError;
                  setErrorFormDetectorCount(t);
                }

                setUserName(state);
              }}
              // onChange={(e) => {
              //   setUserName(e.target.value);
              // }}
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
              setFieldState={(state, isError) => {
                if (isError) {
                  var t = JSON.parse(JSON.stringify(errorFormDetectorCount));
                  t.passwordError = 1;
                  setErrorFormDetectorCount(t);
                } else {
                  var t = JSON.parse(JSON.stringify(errorFormDetectorCount));
                  delete t.passwordError;
                  setErrorFormDetectorCount(t);
                }

                setPassword(state);
              }}
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
      </form>
    </Paper>
  );
}

export default function Login() {
  return (
    <div className="container-fluid">
      <div className="row login-container justify-content-center align-items-center">
        <ToastProvider>
          <LoginFormToast />
        </ToastProvider>
      </div>
    </div>
  );
}
