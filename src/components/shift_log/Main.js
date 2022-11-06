import React, { useEffect, useState } from "react";
import DataTable from "../DataTable";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import AddForm from "./AddForm";
import { TextField } from "@mui/material";
import { CompressOutlined } from "@mui/icons-material";
import ShowForm from "./ShowForm";
import EditForm from "./EditForm";

const options = {
  filter: true,
  filterType: "dropdown",
  responsive: "vertical",
  onColumnSortChange: (changedColumn, direction) =>
    console.log("changedColumn: ", changedColumn, "direction: ", direction),
  onChangeRowsPerPage: (numberOfRows) =>
    console.log("numberOfRows: ", numberOfRows),
  onChangePage: (currentPage) => console.log("currentPage: ", currentPage),
};


const Main = (props) => {
  const [error, setError] = useState("");
  const [dbData, setdbData] = useState([]);
  const [dbColumns, setdbColumns] = useState([]);

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
    var tableConfig = {
      actions: [
        {
          type: "edit",
          clickEvent: (rowData,rowIndex) => {
            // console.log(rowIndex);
            window.alert(
              `Clicked "Edit" for row ${rowIndex} with  of ${rowData}`
            );
          },
        },
        {
          type: "remove",
          clickEvent: (rowData,rowIndex) => {
            window.alert(
              `Clicked "remove" for row ${rowIndex} with  of ${rowData}`
            );
            // triggerRemoveModal();
            // setCurrentIdx(rowIndex);
          },
        },
        {
          type: "view",
          clickEvent: (rowData,rowIndex) => {
            window.alert(
              `Clicked "view" for row ${rowIndex} with  of ${rowData}`
            );
            // triggerRemoveModal();
            // setCurrentIdx(rowIndex);
          },
        },
      ], // table button actions
      columns: dbColumns,
      options: {},
    }

    return tableConfig
  }

  useEffect(() => {
    getTableData();
  }, []);


  return (
    <div className="container-fluid">
      <DataTable tableConfig={getTableCOnfig()} data={dbData} />
    </div>
  );
};

export default Main;
