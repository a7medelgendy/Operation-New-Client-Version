import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import "../styles/datatablestyle.css"

const columns = ["Name", "Company", "City", "State", "Name", "Company", "City", "State", "Name", "Company", "City", "State"];

const data = [
  ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Bob Herm", "Test Corp", "Tampa", "FL", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Bob Herm", "Test Corp", "Tampa", "FL", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Bob Herm", "Test Corp", "Tampa", "FL", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Bob Herm", "Test Corp", "Tampa", "FL", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Bob Herm", "Test Corp", "Tampa", "FL", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Bob Herm", "Test Corp", "Tampa", "FL", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Bob Herm", "Test Corp", "Tampa", "FL", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Bob Herm", "Test Corp", "Tampa", "FL", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Bob Herm", "Test Corp", "Tampa", "FL", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Bob Herm", "Test Corp", "Tampa", "FL", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Bob Herm", "Test Corp", "Tampa", "FL", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Bob Herm", "Test Corp", "Tampa", "FL", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Bob Herm", "Test Corp", "Tampa", "FL", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
  ["Bob Herm", "Test Corp", "Tampa", "FL", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
];

const options = {
  fixedHeader: true,
  fixedSelectColumn: false,
  rowHover: true,

  setRowProps: (row, dataIndex, rowIndex) => {
    var currentRowBg = "data-table-row-odd"

    if(rowIndex%2 == 0){
      currentRowBg = "data-table-row-even"
    }

    return {
      class: + currentRowBg,
    };
  },

  setTableProps: () => {
    return {
      // class:"data-table",
      padding: 'default',
    };
  },

  

  print: false,
};


function MANOLA() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <MUIDataTable
      data={data}
      columns={columns}
      options={options}
    />


  );
}

export default MANOLA;








