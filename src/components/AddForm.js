import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import axios from "axios";
import VirtualizedAutoComplete from "../VirtualizedAutoComplete";

export default function FormDialog(props) {
  const [open, setOpen] = useState(false);

  //form value
  const [groupID, setGroupID] = useState("");
  const [area, setArea] = useState("");
  const [unit, setUnit] = useState("");
  const [timeOpened, setTimeOpened] = useState(
    new Date().toJSON().slice(0, 16)
  );
  const [timeClosed, setTimeClosed] = useState(
    new Date().toJSON().slice(0, 16)
  );
  const [openedBy, setOpenedBy] = useState("");
  const [closedBy, setClosedBy] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [tag, setTag] = useState("");
  const [exeEdara, setExeEdara] = useState("");
  const [unitTags, setUnitTags] = useState([]);

  const [dropDownData, setdropDownData] = useState({});

  const handleOnChange = (value, stateSetter) => {
    stateSetter(value);
  };

  const handleSubmit = () => {
    var dbOjectAdd = {
      groupID: groupID,
      area: area,
      unit: unit,
      openedBy: openedBy,
      closedBy: closedBy,
      description: description,
      status: status,
      tag: tag,
      exeEdara: exeEdara,
      timeOpened: timeOpened,
      timeClosed: timeClosed,
    };

    axios({
      method: "post",
      url: "/api/shiftLog",
      data: dbOjectAdd,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (res) {
        //handle success
        if ((res.status = 200)) {
          props.callBackNewRow(dbOjectAdd);
          setOpen(false);
        } else {
          // setError(" Error user name or password");
          alert("error");
          return;
        }
      })
      .catch(function (res) {
        //handle error
        //setError(" Error user name or password");
        alert("error");
        return;
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    masterData();
    equibmentsData();
  }, []);
  const equibmentsData = () => {
    axios({
      method: "get",
      url: "api/equibments",
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (res) {
        //handle success
        if ((res.status = 200)) {
          if (res.data.result.length > 0) {
            setUnitTags(res.data.result);
          }
        } else {
          // setError(" Error user name or password");
        }
      })
      .catch(function (res) {
        //handle error
        // setError(" Error user name or password");
        return;
      });
  };

  const masterData = () => {
    axios({
      method: "get",
      url: "api/addShift/masterData",
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (res) {
        //handle success
        if ((res.status = 200)) {
          setdropDownData(res.data.result);
        } else {
          // setError(" Error user name or password");
        }
      })
      .catch(function (res) {
        //handle error
        // setError(" Error user name or password");
        return;
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4 m-2">
          <Button
            variant="contained"
            endIcon={<AddCircleOutlineOutlinedIcon />}
            onClick={handleClickOpen}
          >
            NEW
          </Button>
        </div>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>ADD NEW SHIFT LOG</DialogTitle>
          <DialogContent>
            <DialogContentText>
              kindly add new work orders today.
            </DialogContentText>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={
                    dropDownData.hasOwnProperty("shiftGroups")
                      ? dropDownData.shiftGroups.recordset
                      : []
                  }
                  sx={{ width: 250 }}
                  getOptionLabel={(option) => option.TXT_SHIFT}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(_, object) => {
                    handleOnChange(object.CODE_SHIFT, setGroupID);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Group-ID" />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id="area"
                  options={
                    dropDownData.hasOwnProperty("areas")
                      ? dropDownData.areas.recordset
                      : []
                  }
                  sx={{ width: 250 }}
                  getOptionLabel={(option) => option.TXT_AREA}
                  /*  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  } */
                  onChange={(_, object) => {
                    if (object) handleOnChange(object.CODE_AREA, setArea);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Area" />
                  )}
                />

                <Autocomplete
                  disablePortal
                  id="units"
                  options={
                    dropDownData.hasOwnProperty("units")
                      ? dropDownData.units.recordset
                      : []
                  }
                  sx={{ width: 250 }}
                  /*                   isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  } */
                  getOptionLabel={(option) => option.TXT_UNIT}
                  onChange={(_, object) => {
                    if (object) handleOnChange(object.CODE_UNIT, setUnit);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="UNIT" />
                  )}
                />

                <VirtualizedAutoComplete
                  options={unitTags}
                  getOptionLabel={(option) => option.TAG ?? option}
                  renderInput={(params) => (
                    <TextField {...params} label="15,000 Tag" />
                  )}
                  onChange={(_, object) => {
                    if (object) handleOnChange(object.TAG, setTag);
                  }}
                />

                <TextField
                  id="timeOpened"
                  label="time opened"
                  type="datetime-local"
                  defaultValue={new Date().toJSON().slice(0, 16)}
                  sx={{ width: 250 }}
                  onChange={(e) => {
                    handleOnChange(e.target.value, setTimeOpened);
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="timeClosed"
                  label="time closed"
                  type="datetime-local"
                  defaultValue={new Date().toJSON().slice(0, 16)}
                  onChange={(e) => {
                    handleOnChange(e.target.value, setTimeClosed);
                  }}
                  sx={{ width: 250 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Autocomplete
                  disablePortal
                  id="openedBy"
                  options={
                    dropDownData.hasOwnProperty("users")
                      ? dropDownData.users.recordset
                      : []
                  }
                  sx={{ width: 250 }}
                  /*                   isOptionEqualToValue={(option, value) => {
                    return option.ID === value.ID;
                  }} */
                  getOptionLabel={(option) => option.USER_NAME}
                  onChange={(_, object) => {
                    if (object) handleOnChange(object.EMPN, setOpenedBy);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Opended By" />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id="closedBy"
                  options={
                    dropDownData.hasOwnProperty("users")
                      ? dropDownData.users.recordset
                      : []
                  }
                  getOptionLabel={(option) => option.USER_NAME}
                  sx={{ width: 250 }}
                  /*                   isOptionEqualToValue={(option, value) =>
                    option.ID === value.ID
                  } */
                  onChange={(_, object) => {
                    if (object) handleOnChange(object.EMPN, setClosedBy);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Closed By" />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={
                    dropDownData.hasOwnProperty("exeEdara")
                      ? dropDownData.exeEdara.recordset
                      : []
                  }
                  sx={{ width: 250 }}
                  getOptionLabel={(option) => option.TXT_EDARA}
                  renderInput={(params) => (
                    <TextField {...params} label="Executed Edara" />
                  )}
                  onChange={(_, object) => {
                    if (object) handleOnChange(object.CODE_EDARA, setExeEdara);
                  }}
                />

                <TextareaAutosize
                  type="search"
                  maxRows={9}
                  label="description"
                  aria-label="maximum height"
                  placeholder="Maximum 4 rows"
                  defaultValue="Description"
                  onChange={(e) => {
                    handleOnChange(e.target.value, setDescription);
                  }}
                />

                <Autocomplete
                  disablePortal
                  id="status"
                  options={
                    dropDownData.hasOwnProperty("status")
                      ? dropDownData.status.recordset
                      : []
                  }
                  sx={{ width: 250 }}
                  /*                   isOptionEqualToValue={(option, value) => {
                    return option.ID === value.ID;
                  }} */
                  getOptionLabel={(option) => option.TXT_STATUS}
                  onChange={(_, object) => {
                    if (object) handleOnChange(object.CODE_STATUS, setStatus);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Status" />
                  )}
                />
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>New Log</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
