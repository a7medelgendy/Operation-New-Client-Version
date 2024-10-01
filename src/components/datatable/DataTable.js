import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { CircularProgress, Typography } from '@mui/material';

import {
  TableViewButton,
  TableDeleteButton,
  TableEditButton,
} from "./TableActions";
//import { option } from "yargs";

const tableActions = {
  view: TableViewButton,
  edit: TableEditButton,
  remove: TableDeleteButton,
};

/* export default function DataTable(props) {


  const [page, setPage] = useState(0);
  const [count, setCount] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState({});
  const [data, setData] = useState([['Loading Data...']]);
  const [columns] = useState([
    {
      name: 'fullName',
      label: 'Full Name',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log('customBodyRender');
          console.dir(tableMeta);
          return value;
        },
      },
    },
    {
      name: 'title',
      label: 'Title',
      options: {},
    },
    {
      name: 'location',
      label: 'Location',
      options: {},
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData('', 0);
    //getSrcData();
  }, []);

  const getData = async (url, page) => {
    setIsLoading(true);
    const res = await xhrRequest(url, page);
    setData(res.data);
    setCount(res.total);
    setIsLoading(false);
  };

  const getSrcData = () => {
    return [
      { fullName: 'Gabby George', title: 'Business Analyst', location: 'Minneapolis' },
      { fullName: 'Aiden Lloyd', title: 'Business Consultant', location: 'Dallas' },
      { fullName: 'Jaden Collins', title: 'Attorney', location: 'Santa Ana' },
      { fullName: 'Franky Rees', title: 'Business Analyst', location: 'St. Petersburg' },
      { fullName: 'Aaren Rose', title: 'Business Analyst', location: 'Toledo' },

      { fullName: 'John George', title: 'Business Analyst', location: 'Washington DC' },
      { fullName: 'Pat Lloyd', title: 'Computer Programmer', location: 'Baltimore' },
      { fullName: 'Joe Joe Collins', title: 'Attorney', location: 'Las Cruces' },
      { fullName: 'Franky Hershy', title: 'Paper Boy', location: 'El Paso' },
      { fullName: 'Aaren Smalls', title: 'Business Analyst', location: 'Tokyo' },

      { fullName: 'Boogie G', title: 'Police Officer', location: 'Unknown' },
      { fullName: 'James Roulf', title: 'Business Consultant', location: 'Video Game Land' },
      { fullName: 'Mike Moocow', title: 'Burger King Employee', location: 'New York' },
      { fullName: 'Mimi Gerock', title: 'Business Analyst', location: 'McCloud' },
      { fullName: 'Jason Evans', title: 'Business Analyst', location: 'Mt Shasta' },

      { fullName: 'Simple Sam', title: 'Business Analyst', location: 'Mt Shasta' },
      { fullName: 'Marky Mark', title: 'Business Consultant', location: 'Las Cruces' },
      { fullName: 'Jaden Jam', title: 'Attorney', location: 'El Paso' },
      { fullName: 'Holly Jo', title: 'Business Analyst', location: 'St. Petersburg' },
      { fullName: 'Suzie Q', title: 'Business Analyst', location: 'New York' },
    ];
  };

  const xhrRequest = (url, page, sortOrder = {}) => {
    return new Promise((resolve, reject) => {
      // mock page data
      let fullData = getSrcData();
      const total = fullData.length; // mock record count from server - normally this would be a number attached to the return data

      let sortField = sortOrder.name;
      let sortDir = sortOrder.direction;

      if (sortField) {
        fullData = fullData.sort((a, b) => {
          if (a[sortField] < b[sortField]) {
            return 1 * (sortDir === 'asc' ? -1 : 1);
          } else if (a[sortField] > b[sortField]) {
            return -1 * (sortDir === 'asc' ? -1 : 1);
          } else {
            return 0;
          }
        });
      }

      const srcData = fullData.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
      let data = srcData;
      setTimeout(() => {
        resolve({
          data,
          total,
          page,
        });
      }, 500);
    });
  };



  const sort = (page, sortOrder) => {
    setIsLoading(true);
    xhrRequest('', page, sortOrder).then((res) => {
      setData(res.data);
      setPage(res.page);
      setSortOrder(sortOrder);
      setIsLoading(false);
      setCount(res.total);
    });
  };

  const changePage = (page, sortOrder) => {
    setIsLoading(true);
    xhrRequest(`/myApiServer?page=${page}`, page, sortOrder).then((res) => {
      setPage(res.page);
      setSortOrder(sortOrder);
      setData(res.data);
      setIsLoading(false);
      setCount(res.total);
    });
  };

  const options = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'vertical',
    serverSide: true,
    count: count,
    rowsPerPage: rowsPerPage,
    rowsPerPageOptions: [],
    sortOrder: sortOrder,
    onTableChange: (action, tableState) => {
      console.log(action, tableState);

      switch (action) {
        case 'changePage':
          changePage(tableState.page, tableState.sortOrder);
          break;
        case 'sort':
          sort(tableState.page, tableState.sortOrder);
          break;
        default:
          console.log('action not handled.');
      }
    },
  };

  return (
    <div>
      <MUIDataTable
        title={
          <Typography variant="h6">
            ACME Employee list
            {isLoading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
          </Typography>
        }
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );



}
 */



















export default function DataTable(props) {
  let { tableConfig, data } = props;
  if (tableConfig.actions !== undefined && !tableConfig.actionsIsAdded) {
    var actions = {
      name: "",
      label: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        print: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          const RenderTableActions = tableConfig.actions.map((ele, idx) => {
            const ActionButton = tableActions[ele.type];

            return (
              <React.Fragment key={idx}>
                <ActionButton
                  onClick={() => ele.clickEvent(data[dataIndex], dataIndex)}
                />
              </React.Fragment>
            );
          });
          return (
            <div className="d-flex justify-content-start">
              {RenderTableActions}
            </div>
          );
        },
      },
    };
    tableConfig.columns.push(actions);
    tableConfig.actionsIsAdded = true;
  }

  const columns = tableConfig.columns;
  const options = tableConfig.options;



  return (
    <MUIDataTable data={data} columns={columns} options={options} {...props} />
  );
}
















// const Main = (props) => {

//     const columnActions = [
//         {
//             name: "Show",
//             options: {
//                 filter: false,
//                 sort: false,
//                 empty: true,
//                 customBodyRender: (value, tableMeta, updateValue) => {
//                     return (
//                         <ShowForm
//                             rowData={tableMeta.tableData[tableMeta.rowIndex]}
//                             rowindex={tableMeta.rowIndex}
//                         />
//                     );
//                 },
//             },
//         },
//         {
//             name: "Edit",
//             options: {
//                 filter: false,
//                 sort: false,
//                 empty: true,
//                 customBodyRender: (value, tableMeta, updateValue) => {
//                     return (
//                         <EditForm
//                             rowData={tableMeta.tableData[tableMeta.rowIndex]}
//                             rowindex={tableMeta.rowIndex}
//                         />
//                     );
//                 },
//             },
//         },
//         {
//             name: "Delete",
//             options: {
//                 filter: false,
//                 sort: false,
//                 empty: true,
//                 customBodyRenderLite: (dataIndex) => {
//                     return (
//                         <button
//                             onClick={() => {
//                                 const { data } = this.state;
//                                 data.shift();
//                                 this.setState({ data });
//                             }}
//                         >
//                             Delete
//                         </button>
//                     );
//                 },
//             },
//         },
//     ];

//     const options = {
//         filter: true,
//         filterType: "dropdown",
//         responsive: "vertical",
//         onColumnSortChange: (changedColumn, direction) =>
//             //\\console.log("changedColumn: ", changedColumn, "direction: ", direction),
//         onChangeRowsPerPage: (numberOfRows) =>
//             //\\console.log("numberOfRows: ", numberOfRows),
//         onChangePage: (currentPage) => //\\console.log("currentPage: ", currentPage),
//     };

//     return (
//         <div>
//             <Layout />
//             <h1> main page</h1>
//             <div>
//                 <AddForm
//                     callBackNewRow={(newObject) => {
//                         getTableData();
//                     }}
//                 />
//             </div>
//             <div>
//                 <NOServerData Error={error} />
//             </div>

//         </div>
//     );
// };
