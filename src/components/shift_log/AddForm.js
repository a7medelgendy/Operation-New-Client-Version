import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";

import TextFieldValidator from "../form/TextfieldValidator";
import VirtualizedAutoComplete from "../form/VirtualizedAutoComplete";

import "../../styles/add-shift-log-form.css";

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

  // useEffect(() => {
  //   masterData();
  //   equibmentsData();
  // }, []);

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
    <form className="container-fluid pt-1">
      <div className="row form-between-rows-distance">
        <div className="col">
          <Autocomplete
            id="combo-box-demo"
            options={
              dropDownData.hasOwnProperty("shiftGroups")
                ? dropDownData.shiftGroups.recordset
                : []
            }
            size="small"
            getOptionLabel={(option) => option.TXT_SHIFT}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(_, object) => {
              handleOnChange(object.CODE_SHIFT, setGroupID);
            }}
            renderInput={(params) => (
              <TextFieldValidator
                {...params}
                className="input-rounded"
                label="Group Id"
                validation_rules={[{ rule: "isRequired" }]}
                validation_messages={["Group Id is required"]}
              />
            )}
          />
        </div>

        <div className="col">
          <Autocomplete
            disablePortal
            id="area"
            options={
              dropDownData.hasOwnProperty("areas")
                ? dropDownData.areas.recordset
                : []
            }
            size="small"
            getOptionLabel={(option) => option.TXT_AREA}
            onChange={(_, object) => {
              if (object) handleOnChange(object.CODE_AREA, setArea);
            }}
            renderInput={(params) => (
              <TextFieldValidator
                {...params}
                className="input-rounded"
                label="Area"
                validation_rules={[{ rule: "isRequired" }]}
                validation_messages={["Area is required"]}
              />
            )}
          />
        </div>
      </div>

      <div className="row form-between-rows-distance">
        <div className="col">
          <Autocomplete
            disablePortal
            id="units"
            options={
              dropDownData.hasOwnProperty("units")
                ? dropDownData.units.recordset
                : []
            }
            size="small"
            getOptionLabel={(option) => option.TXT_UNIT}
            onChange={(_, object) => {
              if (object) handleOnChange(object.CODE_UNIT, setUnit);
            }}
            renderInput={(params) => (
              <TextFieldValidator
                {...params}
                label="Unit"
                className="input-rounded"
                validation_rules={[{ rule: "isRequired" }]}
                validation_messages={["Unit is required"]}
              />
            )}
          />
        </div>

        <div className="col">
          <VirtualizedAutoComplete
            options={unitTags}
            getOptionLabel={(option) => option.TAG ?? option}
            onChange={(_, object) => {
              if (object) handleOnChange(object.TAG, setTag);
            }}
            size="small"
            renderInput={(params) => (
              <TextFieldValidator
                {...params}
                label="Equipment"
                className="input-rounded"
                validation_rules={[{ rule: "isRequired" }]}
                validation_messages={["Equipment is required"]}
              />
            )}
          />
        </div>
      </div>

      <div className="row form-between-rows-distance">
        <div className="col">
          <TextFieldValidator
            id="timeOpened"
            label="Time Opened"
            type="datetime-local"
            defaultValue={new Date().toJSON().slice(0, 16)}
            size="small"
            onChange={(e) => {
              handleOnChange(e.target.value, setTimeOpened);
            }}
            InputLabelProps={{
              shrink: true,
            }}
            className="input-rounded date-picker"
            validation_rules={[{ rule: "isRequired" }]}
            validation_messages={["Time Opened is required"]}
          />
        </div>
        <div className="col">
          <TextFieldValidator
            id="timeClosed"
            label="Time Closed"
            type="datetime-local"
            defaultValue={new Date().toJSON().slice(0, 16)}
            onChange={(e) => {
              handleOnChange(e.target.value, setTimeClosed);
            }}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            className="input-rounded date-picker"
            validation_rules={[{ rule: "isRequired" }]}
            validation_messages={["Time Closed is required"]}
          />
        </div>
      </div>

      <div className="row form-between-rows-distance">
        <div className="col">
          <Autocomplete
            disablePortal
            id="openedBy"
            options={
              dropDownData.hasOwnProperty("users")
                ? dropDownData.users.recordset
                : []
            }
            getOptionLabel={(option) => option.USER_NAME}
            onChange={(_, object) => {
              if (object) handleOnChange(object.EMPN, setOpenedBy);
            }}
            size="small"
            renderInput={(params) => (
              <TextFieldValidator
                {...params}
                label="Opended By"
                className="input-rounded"
                validation_rules={[{ rule: "isRequired" }]}
                validation_messages={["Opended By is required"]}
              />
            )}
          />
        </div>
        <div className="col">
          <Autocomplete
            disablePortal
            id="closedBy"
            options={
              dropDownData.hasOwnProperty("users")
                ? dropDownData.users.recordset
                : []
            }
            getOptionLabel={(option) => option.USER_NAME}
            size="small"
            onChange={(_, object) => {
              if (object) handleOnChange(object.EMPN, setClosedBy);
            }}
            renderInput={(params) => (
              <TextFieldValidator
                {...params}
                label="Closed By"
                className="input-rounded"
                validation_rules={[{ rule: "isRequired" }]}
                validation_messages={["Closed By is required"]}
              />
            )}
          />
        </div>
      </div>

      <div className="row form-between-rows-distance">
        <div className="col">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={
              dropDownData.hasOwnProperty("exeEdara")
                ? dropDownData.exeEdara.recordset
                : []
            }
            size="small"
            getOptionLabel={(option) => option.TXT_EDARA}
            onChange={(_, object) => {
              if (object) handleOnChange(object.CODE_EDARA, setExeEdara);
            }}
            renderInput={(params) => (
              <TextFieldValidator
                {...params}
                label="Executed Departement"
                className="input-rounded"
                validation_rules={[{ rule: "isRequired" }]}
                validation_messages={["Executed Departement is required"]}
              />
            )}
          />
        </div>
        <div className="col">
          <Autocomplete
            disablePortal
            id="status"
            options={
              dropDownData.hasOwnProperty("status")
                ? dropDownData.status.recordset
                : []
            }
            size="small"
            getOptionLabel={(option) => option.TXT_STATUS}
            onChange={(_, object) => {
              if (object) handleOnChange(object.CODE_STATUS, setStatus);
            }}
            renderInput={(params) => (
              <TextFieldValidator
                {...params}
                label="Status"
                className="input-rounded"
                validation_rules={[{ rule: "isRequired" }]}
                validation_messages={["Status is required"]}
              />
            )}
          />
        </div>
      </div>

      <div className="row form-between-rows-distance">
        <div className="col">
          <TextField
            className="multi-line-input-rounded multi-line-text"
            id="outlined-multiline-static"
            label="Notes"
            multiline
            rows={8}
            defaultValue=""
            onChange={(e) => {
              handleOnChange(e.target.value, setDescription);
            }}
          />
        </div>
      </div>

      <div className="row">
        <div className="col d-flex justify-content-end">
          <Button type="submit" variant="text" className="rounded-btn cancel-btn">
            Cancel
          </Button>
          <Button type="submit" variant="contained" className="rounded-btn save-btn">
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}
