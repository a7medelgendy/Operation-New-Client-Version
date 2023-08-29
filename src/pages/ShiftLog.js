import React, { useEffect, useState } from "react";
import { Button, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

import DataTable from "../components/datatable/DataTable";
import ShiftLogControlForm from "../components/shift_log/ShiftLogControlForm";

import { useToasts } from "react-toast-notifications";

import ConfirmModal from "../components/modal/confirm";
import FormModal from "../components/modal/FormModal";

import { baseUrl } from "../shared/staticData";
import "../styles/shift_log/shiftlog.css";

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



export default function ShiftLog(props) {



  const [error, setError] = useState("");
  const [tableConfig, setTableConfig] = useState({});
  const [dbData, setdbData] = useState([]);
  const [dbColumns, setdbColumns] = useState([]);
  const [totalRowsNumber, setTotalRowsNumber] = useState(1)
  const [page, setPage] = useState(0)
  const [searchString, setSearchString] = useState("")

  let [isLoading, updateLoader] = useState(true);

  const [formType, setFormType] = useState("add");
  const [formLoadData, setFormLoadData] = useState(null);

  const [removeModalIsOpen, setRemoveModalDisplay] = useState(false);
  const [controlModalIsOpen, setControlModalIsOpen] = useState(false);

  const { addToast } = useToasts();


  console.log(dbData.length);

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "none",
    serverSide: true,
    rowsPerPage: 10,
    rowsPerPageOptions: [],

    textLabels: {
      body: {
        noMatch: dbData.length !== 0 ? 'Loading data...' : 'No matching records found',
      },
    }
    // onColumnSortChange: (changedColumn, direction) =>
    //   //\\console.log("changedColumn: ", changedColumn, "direction: ", direction),
    // onChangeRowsPerPage: (numberOfRows) =>
    //   //\\console.log("numberOfRows: ", numberOfRows),
    // onChangePage: (currentPage) => //\\console.log("currentPage: ", currentPage),
  };


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

  const getTableData = (page = 0, perPage = 10, search = "") => {
    console.log("get data");
    axios({
      method: "get",
      url: `${baseUrl}/api/shiftLog?page=${page}&perPage=${perPage}&search=${search}`,
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

              if (title.key == "TXT_STATUS") {
                obj.options.customBodyRender = (value) => {
                  let bgColorClass = {
                    Completed: "bg-success",
                    InProgress: "bg-warning",
                    Canceled: "bg-danger",
                  };
                  return <Chip label={value} className={bgColorClass[value]} />;
                };
              }
              return obj;
            });

            setdbData(res.data.result.columnsData);
            setTotalRowsNumber(res.data.result.total)
            setdbColumns(columnsDbTitle);
            updateLoader(false);
          }
        } else {
          console.log("errrodddddr empty")
          //setError(" Error user name or password");
        }
      })
      .catch(error => {
        //handle error
        setdbData([]);
        updateLoader(false);
        return;
      });
  };

  const changePage = (page) => {
    setPage(page)
    updateLoader(!isLoading)
  }

  const handleSearch = (search) => {
    console.log(search)
    setSearchString(search == null ? "" : search)
    updateLoader(!isLoading)
  }


  const getTableCOnfig = () => {

    const onTableChange = (action, tableState) => {
      switch (action) {
        case 'changePage':
          changePage(tableState.page)
          break;
        default:
          break;
      }
    }

    const tablOptions = { ...options, count: totalRowsNumber, onTableChange: onTableChange, onSearchChange: handleSearch, onSearchOpen: () => { handleSearch("") } }
    const tableConfig = {
      actions: [
        {
          type: "edit",
          clickEvent: (rowData, dataIndex) => {
            handleMode("edit", rowData);
          },
        },
        {
          type: "remove",
          clickEvent: (rowData, dataIndex) => {
            triggerRemoveModal();
            // triggerRemoveModal();
            // setCurrentIdx(rowIndex);
          },
        },
        {
          type: "view",
          clickEvent: (rowData, dataIndex) => {
            handleMode("view", rowData);
          },
        },
      ], // table button actions

      columns: dbColumns,
      options: tablOptions,
    };

    return tableConfig;
  };

  useEffect(() => {
    getTableData(page, options.rowsPerPage, searchString);
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
            confirmClick={() => { }}
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
        <DataTable
          title={"Corrective Maintenance Log"}
          tableConfig={tableConfig}
          data={dbData}
        />
      </div>
    </div>
  );
}
