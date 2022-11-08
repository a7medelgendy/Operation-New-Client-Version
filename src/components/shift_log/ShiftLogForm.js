import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";

import Form from "../../components/form/form";
import TextFieldValidator from "../form/TextfieldValidator";
import VirtualizedAutoComplete from "../form/VirtualizedAutoComplete";

import "../../styles/shift_log/add-shift-log-form.css";
import { baseUrl } from "../../shared/staticData";
import AutoCompleteValidator from "../form/AutoCompleteValidator";

export default function ShiftLogForm(props) {
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

  useEffect(() => {
    masterData();
    equibmentsData();
  }, []);

  const equibmentsData = () => {
    axios({
      method: "get",
      url: baseUrl + "/api/equibments",
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
      url: baseUrl + "/api/addShift/masterData",
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
      .catch((e) => {
        //handle error
        // setError(" Error user name or password");
        return;
      });
  };

  const onSubmit = () => {
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

    const res = props.formHandlerFuncs.onSubmit(
      dbOjectAdd,
      props.alertHandler,
      props.updateLoader
    );

    props.onCloseForm();
  };

  return (
    <Form onSubmit={onSubmit} className="container-fluid pt-1">
      <div className="row form-between-rows-distance">
        <div className="col">
          <AutoCompleteValidator
            id="shiftGroup"
            options={
              dropDownData.hasOwnProperty("shiftGroups")
                ? dropDownData.shiftGroups.recordset
                : []
            }
            size="small"
            getOptionLabel={(option) => option.TXT_SHIFT}
            onChange={(_, object) => {
              if (object) handleOnChange(object.CODE_SHIFT, setGroupID);
            }}
            validation_rules={[{ rule: "isRequired" }]}
            validation_messages={["Group Id is required"]}
            renderInputComponent={(params, error, helperText) => {
              return (
                <TextField
                  {...params}
                  className="input-rounded"
                  label="Group Id"
                  error={error}
                  helperText={helperText}
                />
              );
            }}
          />
        </div>

        <div className="col">
          <AutoCompleteValidator
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
            validation_rules={[{ rule: "isRequired" }]}
            validation_messages={["Group Id is required"]}
            renderInputComponent={(params, error, helperText) => {
              return (
                <TextField
                  {...params}
                  className="input-rounded"
                  label="Area"
                  error={error}
                  helperText={helperText}
                />
              );
            }}
          />
        </div>
      </div>

      <div className="row form-between-rows-distance">
        <div className="col">
          <AutoCompleteValidator
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
            validation_rules={[{ rule: "isRequired" }]}
            validation_messages={["Unit is required"]}
            renderInputComponent={(params, error, helperText) => {
              return (
                <TextField
                  {...params}
                  label="Area"
                  className="input-rounded"
                  error={error}
                  helperText={helperText}
                />
              );
            }}
          />
        </div>

        <div className="col">
          <VirtualizedAutoComplete
            id="Equipment"
            options={unitTags}
            getOptionLabel={(option) => option.TAG ?? option}
            onChange={(_, object) => {
              if (object) handleOnChange(object.TAG, setTag);
            }}
            size="small"
            validation_rules={[{ rule: "isRequired" }]}
            validation_messages={["Unit is required"]}
            renderInputComponent={(params, error, helperText) => {
              return (
                <TextField
                  {...params}
                  label="Equipment"
                  className="input-rounded"
                  error={error}
                  helperText={helperText}
                />
              );
            }}
          />
        </div>
      </div>

      <div className="row form-between-rows-distance">
        <div className="col">
          <TextField
            id="timeOpened"
            label="Time Opened"
            type="datetime-local"
            defaultValue={(() => {
              var d = new Date();
              d.setHours(d.getHours() + 2);
              return d.toJSON().slice(0, 16);
            })()}
            size="small"
            onChange={(e) => {
              handleOnChange(e.target.value, setTimeOpened);
            }}
            InputLabelProps={{
              shrink: true,
            }}
            className="input-rounded date-picker"
          />
        </div>
        <div className="col">
          <TextField
            id="timeClosed"
            label="Time Closed"
            type="datetime-local"
            defaultValue={(() => {
              var d = new Date();
              d.setHours(d.getHours() + 2);
              return d.toJSON().slice(0, 16);
            })()}
            onChange={(e) => {
              handleOnChange(e.target.value, setTimeClosed);
            }}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            className="input-rounded date-picker"
          />
        </div>
      </div>

      <div className="row form-between-rows-distance">
        <div className="col">
          <AutoCompleteValidator
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
            validation_rules={[{ rule: "isRequired" }]}
            validation_messages={["Unit is required"]}
            renderInputComponent={(params, error, helperText) => {
              return (
                <TextField
                  {...params}
                  label="Opended By"
                  className="input-rounded"
                  error={error}
                  helperText={helperText}
                />
              );
            }}
          />
        </div>
        <div className="col">
          <AutoCompleteValidator
            disablePortal
            id="closedBy"
            options={
              dropDownData.hasOwnProperty("users")
                ? dropDownData.users.recordset
                : []
            }
            getOptionLabel={(option) => option.USER_NAME}
            onChange={(_, object) => {
              if (object) handleOnChange(object.EMPN, setClosedBy);
            }}
            size="small"
            validation_rules={[{ rule: "isRequired" }]}
            validation_messages={["Unit is required"]}
            renderInputComponent={(params, error, helperText) => {
              return (
                <TextField
                  {...params}
                  label="Closed By"
                  className="input-rounded"
                  error={error}
                  helperText={helperText}
                />
              );
            }}
          />
        </div>
      </div>

      <div className="row form-between-rows-distance">
        <div className="col">
          <AutoCompleteValidator
            disablePortal
            id="department"
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
            validation_rules={[{ rule: "isRequired" }]}
            validation_messages={["Executed Departement is required"]}
            renderInputComponent={(params, error, helperText) => {
              return (
                <TextField
                  {...params}
                  label="Executed Departement"
                  className="input-rounded"
                  error={error}
                  helperText={helperText}
                />
              );
            }}
          />
        </div>
        <div className="col">
          <AutoCompleteValidator
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
            validation_rules={[{ rule: "isRequired" }]}
            validation_messages={["Status is required"]}
            renderInputComponent={(params, error, helperText) => {
              return (
                <TextField
                  {...params}
                  label="Status"
                  className="input-rounded"
                  error={error}
                  helperText={helperText}
                />
              );
            }}
          />
        </div>
      </div>

      <div className="row form-between-rows-distance">
        <div className="col">
          <TextField
            className="multi-line-input-rounded multi-line-text"
            id="outlined-multiline-static"
            label="Notes..."
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
          <Button
            variant="text"
            className="rounded-btn cancel-btn"
            onClick={props.onCloseForm}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            className="rounded-btn save-btn"
          >
            Save
          </Button>
        </div>
      </div>
    </Form>
  );
}
