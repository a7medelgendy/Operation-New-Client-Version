import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import AddForm from "../components/shift_log/AddForm";
import { Button, TextField } from "@mui/material";
import { CompressOutlined } from "@mui/icons-material";
import ShowForm from "../components/shift_log/ShowForm";
import EditForm from "../components/shift_log/EditForm";
import ConfirmModal from "../components/modal/confirm";
import FormModal from "../components/modal/FormModal";
import "../styles/shiftlog.css";

const options = {
  filter: true,
  filterType: "dropdown",
  responsive: "vertical",
  selectableRows:"none"
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
  const [removeModalIsOpen, setRemoveModalDisplay] = useState(false);
  const [addModalIsOpen, setAddModalDisplay] = useState(false);

  const triggerAddModal = () => {
    setAddModalDisplay(!addModalIsOpen);
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
      url: "/api/shiftLog",
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
            window.alert(
              `Clicked "Edit" for row ${rowIndex} with  of ${rowData}`
            );
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
    setTableConfig(getTableCOnfig)
  }, [isLoading]);

  return (
    <div className="container-fluid">
      <div className="row mb-3">
        <div className="col d-flex justify-content-end">
          <Button
            onClick={triggerAddModal}
            variant="contained"
            color="primary"
            className="add-button"
          >
            {"Add Shift Log"}
          </Button>
          <FormModal
            open={addModalIsOpen}
            cancleClick={triggerAddModal}
            confirmClick={triggerAddModal}
            title={"Shift Log"}
          >
            <AddForm />
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
