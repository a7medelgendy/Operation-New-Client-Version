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
} from "@mui/material";

const FailedLogin = (props) => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  if (props.Error) {
    return (
      <div>
        <Alert severity="error" className="m-5">
          {props.Error}
        </Alert>
      </div>
    );
  } else {
    return <div></div>;
  }
};

const Login = () => {
  const [checked, setChecked] = React.useState(true);
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const navigate = useNavigate();

  const loginClick = (e) => {
    /*axios
      .post("/api/login", { userName: "ahmed", password: "asdfas" })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });*/
    if (userName == "" || password == "") {
      setError("user name or password is wrong");
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
          return navigate("/main", { state: { id: 1, name: "sabaoon" } });
        } else {
          setError(" Error user name or password");
          return;
        }
      })
      .catch(function (res) {
        //handle error
        setError(" Error user name or password");
        return;
      });
  };

  return (
    <div style={{ padding: 30 }}>
      <Paper>
        <FailedLogin Error={error} />
        <Grid
          container
          spacing={3}
          direction={"column"}
          justify={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12}>
            <TextField
              label="Username"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type={"password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <Button onClick={loginClick} variant="contained" className="m-2">
              Log In
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Login;
