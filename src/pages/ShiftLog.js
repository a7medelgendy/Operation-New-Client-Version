import React, { Fragment, useEffect, useState } from 'react';
import {  Chip } from '@mui/material';
import DataTable from '../components/datatable/DataTable';
import ShiftLogControlForm from '../components/shift_log/ShiftLogControlForm';
import { useToasts } from 'react-toast-notifications';
import ConfirmModal from '../components/modal/confirm';
import FormModal from '../components/modal/FormModal';
import user from '../shared/user';
import '../styles/shift_log/shiftlog.css';
import { handleRequest } from '../utilites/handleApiRequest';


const handleSubmitAdd = async (dbOjectAdd, alertHandler, updateLoader) => {
  const response = await handleRequest('POST', 'api/shiftLog', dbOjectAdd);
  if (response) {
    alertHandler('Work order added successfully!', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 2000 });

    updateLoader(true);
    return true;
  } else {
    alertHandler('Failed to add work order. Please try again.', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 4000 });
  }
  return false;
};

const handleSubmitEdit = async (dbOjectEdit, alertHandler, updateLoader) => {
  const response = await handleRequest('PUT', 'api/shiftLog', dbOjectEdit);
  if (response) {
    alertHandler('Work order updated  successfully!', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 2000 });

    updateLoader(true);
    return true;
  } else {
    alertHandler('Failed to update work order. Please review your changes and try again.', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 4000 });
  }

  return false;
};

const modalFormTypes = {
  view: {
    form: ShiftLogControlForm,
    formHandlerFuncs: { onSubmit: handleSubmitAdd }
  },
  add: {
    form: ShiftLogControlForm,
    formHandlerFuncs: { onSubmit: handleSubmitAdd }
  },
  edit: {
    form: ShiftLogControlForm,
    formHandlerFuncs: { onSubmit: handleSubmitEdit }
  },
  dataSheet: {
    form: ShiftLogControlForm,
    formHandlerFuncs: { onSubmit: handleSubmitEdit }
  }
};

export default function ShiftLog(props) {
  const [tableConfig, setTableConfig] = useState({});
  const [dbData, setdbData] = useState([]);
  const [dbColumns, setdbColumns] = useState([]);
  const [totalRowsNumber, setTotalRowsNumber] = useState(1);
  const [page, setPage] = useState(0);
  const [searchString, setSearchString] = useState('');
  const [filterData, setFilterData] = useState([]);
  let [isLoading, updateLoader] = useState(true);
  const [formType, setFormType] = useState('add');
  const [formLoadData, setFormLoadData] = useState(null);
  const [removeModalIsOpen, setRemoveModalDisplay] = useState(false);
  const [controlModalIsOpen, setControlModalIsOpen] = useState(false);

  const { addToast } = useToasts();

  const handleViewPdf = async (info) => {
    try {
      let pathParam = {
        unit: info.CODE_UNIT,
        equipmentTag: info.EQUIBMENT
      };
      const response = await handleRequest('POST', 'api/document/dataSheet', pathParam, 'blob');
      const url = URL.createObjectURL(response);
      window.open(url, '_blank');
    } catch (error) {
      addToast(`Oops! It seems there is no data sheet available with ID: ${info.EQUIBMENT}. Please contact support.`, {
        appearance: 'error',
        autoDismiss: true,
        autoDismissTimeout: 7000
      });
    }
    return true;
  };

  const options = {
    filter: true,
    serverSide: true,
    filterType: 'dropdown',
    responsive: 'standard',
    selectableRows: 'none',
    rowsPerPage: 10,
    rowsPerPageOptions: [],
    textLabels: {
      body: {
        noMatch: dbData.length !== 0 ? 'Loading data...' : 'No matching records found'
      }
    }
  };

  const triggerControllModal = (status) => {
    setControlModalIsOpen(status);
  };

  const handleMode = (type, LoadedData = null) => {
    setFormType(type);
    setFormLoadData(LoadedData);
    triggerControllModal(true);
  };

  const triggerRemoveModal = () => {
    setRemoveModalDisplay(!removeModalIsOpen);
  };

  const removeData = () => {
    triggerRemoveModal();
  };

  const getTableData = async () => {
    let data = { page: page, perPage: options.rowsPerPage, search: searchString, filterData: filterData, edaraCode: user.userData.edara_code };

    const response = await handleRequest('GET', 'api/shiftLog', data);
    if (response) {
      var columnsDbTitle = response.result.showedColumns.map((data) => {
        var obj = {
          name: data.key,
          label: data.en,
          options: {
            filter: data.filter,
            sort: false,
            filterOptions: {
              names: data.masterArray
            }
          }
        };

        if (data.key === 'TXT_STATUS') {
          obj.options.customBodyRender = (value) => {
            let bgColorClass = {
              Completed: 'bg-success',
              InProgress: 'bg-warning',
              Canceled: 'bg-danger'
            };
            return <Chip label={value} style={{ borderRadius: '4px', width: '100%' }} className={bgColorClass[value]} />;
          };
        }
        return obj;
      });

      setdbData(response.result.columnsData);
      setTotalRowsNumber(response.result.total);
      setdbColumns(columnsDbTitle);
      updateLoader(false);
    } else {
      addToast('Oops! It seems there was an issue, Kindly contact to support', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 4000 });
      return false;
    }
  };

  const changePage = (page) => {
    setPage(page);
    updateLoader(true);
  };

  let searchTimeout;
  const handleSearch = (search) => {
    setSearchString(search == null ? '' : search);
    setPage(0);
    // Clear any existing timeout to debounce the search
    clearTimeout(searchTimeout);

    // Set a new timeout to execute the search after a delay
    searchTimeout = setTimeout(() => {
      //getTableData();
      updateLoader(true);
    }, 500);
  };

  const handleFilterChange = ({ columns, filterList }) => {
    let filerData = {};
    const result = filterList.map((filter, index) => {
      if (Array.isArray(filter) && filter.length > 0) {
        filerData[columns[index].name] = filter;
      }
    });
    setFilterData(filerData);
    updateLoader(true);
  };

  const getTableCOnfig = () => {
    const onTableChange = (action, tableState) => {
      switch (action) {
        case 'changePage':
          changePage(tableState.page);
          break;
        case 'filterChange':
          handleFilterChange(tableState);
          break;
        default:
          break;
      }
    };

    const tablOptions = {
      ...options,
      count: totalRowsNumber,
      onTableChange: (action, tableState) => onTableChange(action, tableState),
      onSearchChange: handleSearch,
      onSearchOpen: () => {
        handleSearch('');
      }
    };

    let actions = [];
    actions.push({
      type: 'view',
      clickEvent: (rowData, dataIndex) => {
        handleMode('view', rowData);
      }
    });

    if (user.hasGroup('control')) {
      actions.push({
        type: 'dataSheet',
        clickEvent: (rowData, dataIndex) => {
          //handleMode('dataSheet', rowData);
          handleViewPdf(rowData);
        }
      });
    }

    if (user.hasGroup('operator')) {
      actions.push(
        {
          type: 'edit',
          clickEvent: (rowData, dataIndex) => {
            handleMode('edit', rowData);
          }
        },
        {
          type: 'remove',
          clickEvent: (rowData, dataIndex) => {
            triggerRemoveModal();
            // triggerRemoveModal();
            // setCurrentIdx(rowIndex);
          }
        }
      );
    }
    const tableConfig = {
      actions: actions, // table button actions
      columns: dbColumns,
      options: tablOptions,
      responsive: 'standard'
    };
    return tableConfig;
  };

  useEffect(() => {
    getTableData();
    setTableConfig(getTableCOnfig());
  }, [isLoading]);

  return (
    <div className='container-fluid'>
      <div className='row mb-4'>
        <h2 className='col-sm-8 mb-0' style={{ fontSize: '24px', fontFamily: 'Roboto', fontWeight: 'bold', color: '#0c0c0c' }}>
          Corrective Maintenance Work Orders
        </h2>
        <div className='col-sm-4 d-flex justify-content-end'>
          {user.hasGroup('operator') ? (
            <Fragment>
              <button onClick={() => handleMode('add')} className='btn  d-flex align-items-center btn fw-bold btn-outline-success'>
                <i className='fa-solid fa-file-circle-plus fa-xl me-2'></i>
                Add Work Order
              </button>
            </Fragment>
          ) : (
            ''
          )}

          <FormModal open={controlModalIsOpen} cancleClick={triggerControllModal} confirmClick={() => {}} title={'Work Order' + ' - ' + formType[0].toUpperCase() + formType.slice(1)}>
            {(() => {
              const Form = modalFormTypes[formType].form;
              return <Form formHandlerFuncs={modalFormTypes[formType].formHandlerFuncs} alertHandler={addToast} updateLoader={updateLoader} onCloseForm={triggerControllModal} formLoadData={formLoadData} type={formType} />;
            })()}
          </FormModal>
        </div>
      </div>
      <div className='row mb-3'>
        <ConfirmModal open={removeModalIsOpen} cancleClick={triggerRemoveModal} confirmClick={removeData} message={"You don't have permission to delete ."} title={'Alert'} />
        <DataTable title={''} tableConfig={tableConfig} data={dbData} />
      </div>
    </div>
  );
}
