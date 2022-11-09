import React, { useEffect, useState } from "react";
import DataTable from "../components/datatable/DataTable";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import ShiftLogForm from "../components/shift_log/ShiftLogForm";
import { Button, TextField } from "@mui/material";
import { CompressOutlined } from "@mui/icons-material";
import { useToasts } from "react-toast-notifications";

import ShowForm from "../components/shift_log/ShowForm";
import EditForm from "../components/shift_log/EditForm";
import ConfirmModal from "../components/modal/confirm";
import FormModal from "../components/modal/FormModal";

import "../styles/shift_log/shiftlog.css";
import { baseUrl } from "../shared/staticData";

const handleSubmitAdd = (dbOjectAdd, alertHandler, updateLoader) => {
  console.log("5awalaty");
  axios({
    method: "post",
    url: baseUrl + "/api/shiftLog",
    data: dbOjectAdd,
    config: { headers: { "Content-Type": "multipart/form-data" } },
  })
    .then((res) => {
      //handle success
      if ((res.status = 200)) {
        alertHandler("Shift log added successfully", {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });

        updateLoader(true);

        return true;
      } else {
        alertHandler(
          "Shift log not added successfully please try again later.",
          {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 4000,
          }
        );
      }
    })
    .catch((e) => {
      alertHandler(
        "Shift log not added successfully please contact software team.",
        {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 4000,
        }
      );
    });

  return false;
};

const modalFormTypes = {
  view: { form: ShiftLogForm, formHandlerFuncs: { onSubmit: handleSubmitAdd } },
  add: { form: ShiftLogForm, formHandlerFuncs: { onSubmit: handleSubmitAdd } },
  edit: { form: ShiftLogForm, formHandlerFuncs: { onSubmit: handleSubmitAdd } },
};

const options = {
  filter: true,
  filterType: "dropdown",
  responsive: "vertical",
  selectableRows: "none",
  // onColumnSortChange: (changedColumn, direction) =>
  //   console.log("changedColumn: ", changedColumn, "direction: ", direction),
  // onChangeRowsPerPage: (numberOfRows) =>
  //   console.log("numberOfRows: ", numberOfRows),
  // onChangePage: (currentPage) => console.log("currentPage: ", currentPage),
};

export default function ShiftLog(props) {
  const [error, setError] = useState("");
  const [tableConfig, setTableConfig] = useState({});
  const [dbData, setdbData] = useState([]);
  const [dbColumns, setdbColumns] = useState([]);
  let [isLoading, updateLoader] = useState(true);

  const [formType, setFormType] = useState("add");
  const [removeModalIsOpen, setRemoveModalDisplay] = useState(false);
  const [controlModalIsOpen, setControlModalIsOpen] = useState(false);
  const { addToast } = useToasts();

  const triggerControllModal = () => {
    setFormType("add");
    setControlModalIsOpen(!controlModalIsOpen);
  };

  const triggerRemoveModal = () => {
    setRemoveModalDisplay(!removeModalIsOpen);
  };

  const removeData = () => {
    triggerRemoveModal();
  };

  const getTableData = () => {
    axios({
      method: "get",
      url: baseUrl + "/api/shiftLog",
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (res) {
        //handle success
        if ((res.status = 200)) {
          if (res.data.result.columnsData.length > 0) {
            var columnsDbTitle = res.data.result.showedColumns.map((title) => {
              return {
                name: title.key,
                label: title.en,
                options: {
                  filter: true,
                  sort: true,
                },
              };
            });

            setdbData(res.data.result.columnsData);
            setdbColumns(columnsDbTitle);
            updateLoader(false);
          }
        } else {
          setError(" Error user name or password");
        }
      })
      .catch(function (res) {
        //handle error
        setError(" Error user name or password");
        return;
      });
  };

  const getTableCOnfig = () => {
    const tableConfig = {
      actions: [
        {
          type: "edit",
          clickEvent: (rowData, rowIndex) => {
            // console.log(rowIndex);
            /*             window.alert(
              `Clicked "Edit" for row ${rowIndex} with  of ${rowData}`
            ); */
            // setFormType("edit");
          },
        },
        {
          type: "remove",
          clickEvent: (rowData, rowIndex) => {
            triggerRemoveModal();
            // triggerRemoveModal();
            // setCurrentIdx(rowIndex);
          },
        },
        {
          type: "view",
          clickEvent: (rowData, rowIndex) => {
            window.alert(
              `Clicked "view" for row ${rowIndex} with  of ${rowData}`
            );
            setFormType("view");
            // triggerRemoveModal();
            // setCurrentIdx(rowIndex);
          },
        },
      ], // table button actions

      columns: dbColumns,
      options: options,
    };

    return tableConfig;
  };

  useEffect(() => {
    getTableData();
    setTableConfig(getTableCOnfig);
    const loggedInUser = localStorage.getItem("isLoggedIn");
    if (loggedInUser) {
      // const foundUser = JSON.parse(loggedInUser);
      console.log("-----------------");
      console.dir(loggedInUser);
      console.log("-----------------");
    }
  }, [isLoading]);

  return (
    <div className="container-fluid">
      <div className="row mb-3">
        <div className="col d-flex justify-content-end">
          <Button
            onClick={triggerControllModal}
            variant="contained"
            color="primary"
            className="add-button"
          >
            {"Add Shift Log"}
          </Button>
          <FormModal
            open={controlModalIsOpen}
            cancleClick={triggerControllModal}
            confirmClick={triggerControllModal}
            title={"Shift Log"}
          >
            {(() => {
              const Form = modalFormTypes[formType].form;
              return (
                <Form
                  formHandlerFuncs={modalFormTypes[formType].formHandlerFuncs}
                  alertHandler={addToast}
                  updateLoader={updateLoader}
                  onCloseForm={triggerControllModal}
                />
              );
            })()}
          </FormModal>
        </div>
      </div>

      <div className="row mb-3">
        <ConfirmModal
          open={removeModalIsOpen}
          cancleClick={triggerRemoveModal}
          confirmClick={removeData}
          message={"Confirm Delete"}
          title={"Confirm"}
        />
        <DataTable
          title={"Corrective Maintenance Log"}
          tableConfig={tableConfig}
          data={dbData}
        />
      </div>
    </div>
  );
}
