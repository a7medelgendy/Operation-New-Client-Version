import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import DataTable from "../components/datatable/DataTable";
import ShiftLogControlForm from "../components/shift_log/ShiftLogControlForm";

import { useToasts } from "react-toast-notifications";

import ConfirmModal from "../components/modal/confirm";
import FormModal from "../components/modal/FormModal";

import "../styles/shift_log/shiftlog.css";
import { baseUrl } from "../shared/staticData";
import { type } from "@testing-library/user-event/dist/type";

const handleSubmitAdd = (dbOjectAdd, alertHandler, updateLoader) => {
  axios({
    method: "post",
    url: baseUrl + "/api/shiftLog",
    data: dbOjectAdd,
    config: { headers: { "Content-Type": "multipart/form-data" } },
  })
    .then((res) => {
      //handle success
      if (res.data.success && (res.status = 200)) {
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

const handleSubmitEdit = (dbOjectEdit, alertHandler, updateLoader) => {
  axios({
    method: "put",
    url: baseUrl + "/api/shiftLog",
    data: dbOjectEdit,
    config: { headers: { "Content-Type": "multipart/form-data" } },
  })
    .then(function (res) {
      //handle success
      if (res.data.success && (res.status = 200)) {
        alertHandler("Shift log edit successfully", {
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
  view: {
    form: ShiftLogControlForm,
    formHandlerFuncs: { onSubmit: handleSubmitAdd },
  },
  add: {
    form: ShiftLogControlForm,
    formHandlerFuncs: { onSubmit: handleSubmitAdd },
  },
  edit: {
    form: ShiftLogControlForm,
    formHandlerFuncs: { onSubmit: handleSubmitEdit },
  },
};

const options = {
  filter: true,
  filterType: "dropdown",
  responsive: "vertical",
  selectableRows: "none",
  // onColumnSortChange: (changedColumn, direction) =>
  //   //console.log("changedColumn: ", changedColumn, "direction: ", direction),
  // onChangeRowsPerPage: (numberOfRows) =>
  //   //console.log("numberOfRows: ", numberOfRows),
  // onChangePage: (currentPage) => //console.log("currentPage: ", currentPage),
};

export default function ShiftLog(props) {
  const [error, setError] = useState("");
  const [tableConfig, setTableConfig] = useState({});
  const [dbData, setdbData] = useState([]);
  const [dbColumns, setdbColumns] = useState([]);
  let [isLoading, updateLoader] = useState(false);

  const [formType, setFormType] = useState("add");
  const [formLoadData, setFormLoadData] = useState(null);

  const [removeModalIsOpen, setRemoveModalDisplay] = useState(false);
  const [controlModalIsOpen, setControlModalIsOpen] = useState(false);

  const { addToast } = useToasts();

  const triggerControllModal = () => {
    setControlModalIsOpen(!controlModalIsOpen);
  };

  const handleMode = (type, LoadedData = null) => {
    setFormType(type);
    setFormLoadData(LoadedData);
    triggerControllModal();
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
              var obj = {
                name: title.key,
                label: title.en,
                options: {
                  filter: true,
                  sort: true,
                },
              };

              if ((title.key == "TXT_STATUS")) {
                console.log("a7a")
                obj.customBodyRender = (states) =>
                  states.map((state, index) => (
                    <Chip key={index} label={state} />
                  ));
              }
              return obj;
            });

            setdbData(res.data.result.columnsData);
            setdbColumns(columnsDbTitle);
            updateLoader(false);
          }
        } else {
          //setError(" Error user name or password");
        }
      })
      .catch(function (res) {
        //handle error
        // setError(" Error user name or password");
        return;
      });
  };

  const getTableCOnfig = () => {
    const tableConfig = {
      actions: [
        {
          type: "edit",
          clickEvent: (rowData, rowIndex) => {
            handleMode("edit", rowData);
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
            handleMode("view", rowData);
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
  }, [isLoading]);

  return (
    <div className="container-fluid">
      <div className="row mb-3">
        <div className="col d-flex justify-content-end">
          <Button
            onClick={() => {
              handleMode("add");
            }}
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            className="add-button"
          >
            {"Add Shift Log"}
          </Button>
          <FormModal
            open={controlModalIsOpen}
            cancleClick={triggerControllModal}
            confirmClick={() => {}}
            title={
              "Shift Log" +
              " - " +
              formType[0].toUpperCase() +
              formType.slice(1)
            }
          >
            {(() => {
              const Form = modalFormTypes[formType].form;
              return (
                <Form
                  formHandlerFuncs={modalFormTypes[formType].formHandlerFuncs}
                  alertHandler={addToast}
                  updateLoader={updateLoader}
                  onCloseForm={triggerControllModal}
                  formLoadData={formLoadData}
                  type={formType}
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
        <DataTable tableConfig={tableConfig} data={dbData} />
      </div>
    </div>
  );
}
