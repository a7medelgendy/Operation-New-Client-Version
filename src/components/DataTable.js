import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import {
  TableViewButton,
  TableDeleteButton,
  TableEditButton,
} from "./TableActions";

const tableActions = {
  view: TableViewButton,
  edit: TableEditButton,
  remove: TableDeleteButton,
};

export default function DataTable(props) {
  let { tableConfig, data } = props;
  if (tableConfig.actions !== undefined && !tableConfig.actionsIsAdded) {
    var actions = {
      name: "action",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const RenderTableActions = tableConfig.actions.map((ele, idx) => {
            const ActionButton = tableActions[ele.type];
            return (
              <React.Fragment key={idx}>
                <ActionButton
                  onClick={() => ele.clickEvent(tableMeta.tableData[tableMeta.rowIndex], tableMeta.rowIndex)}
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
    <MUIDataTable
      data={data}
      columns={columns}
      options={options}
      {...props}
    />
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
//             console.log("changedColumn: ", changedColumn, "direction: ", direction),
//         onChangeRowsPerPage: (numberOfRows) =>
//             console.log("numberOfRows: ", numberOfRows),
//         onChangePage: (currentPage) => console.log("currentPage: ", currentPage),
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
