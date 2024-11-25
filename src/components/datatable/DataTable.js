import React from 'react';
import MUIDataTable from 'mui-datatables';

import { TableViewButton, TableDeleteButton, TableEditButton, dataSheetButton } from './TableActions';
//import { option } from "yargs";

const tableActions = {
  view: TableViewButton,
  edit: TableEditButton,
  remove: TableDeleteButton,
  dataSheet: dataSheetButton
};

export default function DataTable(props) {
  let { tableConfig, data } = props;

  if (tableConfig.actions !== undefined && !tableConfig.actionsIsAdded) {
    var actions = {
      name: '',
      label: '',
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
                <ActionButton onClick={() => ele.clickEvent(data[dataIndex], dataIndex)} />
              </React.Fragment>
            );
          });
          return <div className='d-flex justify-content-start'>{RenderTableActions}</div>;
        }
      }
    };
    tableConfig.columns.push(actions);
    tableConfig.actionsIsAdded = true;
  }

  const columns = tableConfig.columns;
  const options = tableConfig.options;

  return <MUIDataTable data={data} columns={columns} options={options} {...props} />;
}
