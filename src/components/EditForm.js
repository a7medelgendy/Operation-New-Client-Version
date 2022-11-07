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
import { baseUrl } from "../shared/staticData.js";
export default function EditForm(props) {
  const [open, setOpen] = useState(false);
  //form value
  const [groupID, setGroupID] = useState(props.rowData.CODE_SHIFT);
  const [area, setArea] = useState(props.rowData.CODE_AREA);
  const [unit, setUnit] = useState(props.rowData.CODE_UNIT);
  const [timeOpened, setTimeOpened] = useState(
    new Date(props.rowData.TIME_OPEN)
  );
  const [timeClosed, setTimeClosed] = useState(
    new Date(props.rowData.TIME_CLOSED)
  );
  const [openedBy, setOpenedBy] = useState(props.rowData.OPENED_BY_EMPN);
  const [closedBy, setClosedBy] = useState(props.rowData.CLOSED_BY_EMPN);
  const [description, setDescription] = useState(props.rowData.DESCREPTION);
  const [status, setStatus] = useState(props.rowData.CODE_STATUS);
  const [tag, setTag] = useState(props.rowData.EQUIBMENT);
  const [exeEdara, setExeEdara] = useState(props.rowData.CODE_EDARA);
  const [unitTags, setUnitTags] = useState([]);

  const [dropDownData, setdropDownData] = useState({});

  const handleOnChange = (value, stateSetter) => {
    stateSetter(value);
  };

  const handleSubmit = () => {
    var dbOject = {
      id: props.rowData.ID ? props.rowData.ID : "",
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
      method: "put",
      url: baseUrl + "/api/shiftLog",
      data: dbOject,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (res) {
        //handle success
        if ((res.status = 200)) {
          props.callBackNewRow(dbOject);
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
      url: baseUrl + "api/equibments",
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
      url: baseUrl + "api/addShift/masterData",
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
            EDIT
          </Button>
        </div>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>EDIT NEW SHIFT LOG</DialogTitle>
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
                  defaultValue={{
                    TXT_SHIFT: props.rowData.TXT_SHIFT,
                    CODE_SHIFT: props.rowData.CODE_SHIFT,
                  }}
                  sx={{ width: 250 }}
                  getOptionLabel={(option) => option.TXT_SHIFT}
                  /*   isOptionEqualToValue={(option, value) => {
                    return option.id === value.id;
                  }} */
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
                  defaultValue={{
                    TXT_AREA: props.rowData.TXT_AREA,
                    CODE_AREA: props.rowData.CODE_AREA,
                  }}
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
                  defaultValue={{
                    TXT_UNIT: props.rowData.TXT_UNIT,
                    CODE_UNIT: props.rowData.CODE_UNIT,
                  }}
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
                  defaultValue={props.rowData.EQUIBMENT}
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
                  defaultValue={new Date(props.rowData.TIME_OPEN)
                    .toJSON()
                    .slice(0, 16)}
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
                  defaultValue={new Date(props.rowData.TIME_CLOSE)
                    .toJSON()
                    .slice(0, 16)}
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
                  defaultValue={{
                    USER_NAME: props.rowData.OPENED_BY,
                    EMPN: props.rowData.OPENED_BY_EMPN,
                  }}
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
                  defaultValue={{
                    USER_NAME: props.rowData.CLOSED_BY,
                    EMPN: props.rowData.CLOSED_BY_EMPN,
                  }}
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
                  defaultValue={{
                    TXT_EDARA: props.rowData.TXT_EDARA,
                    CODE_EDARA: props.rowData.CODE_EDARA,
                  }}
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
                  defaultValue={props.rowData.DESCREPTION}
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
                  defaultValue={{
                    TXT_STATUS: props.rowData.TXT_STATUS,
                    //STATUS_CODE: props.rowData.STATUS_CODE,
                  }}
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
            <Button onClick={handleSubmit}>Update</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
