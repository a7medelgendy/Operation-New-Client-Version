import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import AddForm from "./AddForm";
import { TextField } from "@mui/material";
import { CompressOutlined } from "@mui/icons-material";
import ShowForm from "./ShowForm";
import EditForm from "./EditForm";
const NOServerData = (props) => {
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

const Main = (props) => {
  const [error, setError] = useState("");
  const [dbData, setdbData] = useState([]);
  const [dbColumns, setdbColumns] = useState([]);
  useEffect(() => {
    getTableData();
  }, []);

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

            var columnKeys = columnsDbTitle.concat(columnActions);
            setdbData(res.data.result.columnsData);
            setdbColumns(columnKeys);
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

  const getDataByIndex = (index) => {
    console.log(dbData[index]);
    return dbData[index];
  };

  const columnActions = [
    {
      name: "Show",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <ShowForm
              rowData={tableMeta.tableData[tableMeta.rowIndex]}
              rowindex={tableMeta.rowIndex}
            />
          );
        },
      },
    },
    {
      name: "Edit",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <EditForm
              rowData={tableMeta.tableData[tableMeta.rowIndex]}
              rowindex={tableMeta.rowIndex}
            />
          );
        },
      },
    },
    {
      name: "Delete",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex) => {
          return (
            <button
              onClick={() => {
                const { data } = this.state;
                data.shift();
                this.setState({ data });
              }}
            >
              Delete
            </button>
          );
        },
      },
    },
  ];

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
  return (
    <div>
      <Layout />
      <h1> main page</h1>
      <div>
        <AddForm
          callBackNewRow={(newObject) => {
            getTableData();
          }}
        />
      </div>
      <div>
        <NOServerData Error={error} />
      </div>
      <MUIDataTable title={"Employee List"} data={dbData} columns={dbColumns} />
    </div>
  );
};

export default Main;
