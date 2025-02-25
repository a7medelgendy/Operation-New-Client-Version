import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Form from '../form/form';
import '../../styles/shift_log/add-shift-log-form.css';
import '../../styles/shift_log/shift-log-form-view.css';
import user from '../../shared/user';
import { handleRequest } from '../../utilites/handleApiRequest';

function TextWrapper({ viewType, ...props }) {
  const { InputProps, ...restProps } = props;
  const classess = props.className.map((ele) => {
    let className = ele;
    if (viewType === 'view') {
      className += '-view';
    }
    return className;
  });
  const className = classess.join(' ');

  return viewType === 'view' ? <TextField {...restProps} InputProps={{ readOnly: true }} className={className} /> : <TextField {...props} className={className} />;
}

export default function ShiftLogControlForm(props) {
  const [groupID, setGroupID] = useState({ TXT_SHIFT: '', CODE_SHIFT: '' });
  const [area, setArea] = useState('');
  const [unit, setUnit] = useState({ TXT_UNIT: '', CODE_UNIT: '' });
  const [timeOpened, setTimeOpened] = useState(
    (() => {
      var obj = new Date();
      obj.setHours(obj.getHours() + 2);
      return obj.toJSON().slice(0, 16);
    })()
  );
  const [timeClosed, setTimeClosed] = useState(
    (() => {
      var obj = new Date();
      obj.setHours(obj.getHours() + 2);
      return obj.toJSON().slice(0, 16);
    })()
  );
  const [openedBy, setOpenedBy] = useState({ EMPN: null, USER_NAME: '' });
  const [closedBy, setClosedBy] = useState({ EMPN: null, USER_NAME: '' });
  const [reqDescription, setReqDescription] = useState('');
  const [exeDescription, setExeDescription] = useState('');
  const [status, setStatus] = useState({ CODE_STATUS: '', TXT_STATUS: '' });
  const [tag, setTag] = useState({ TAG: '' });
  const [exeEdara, setExeEdara] = useState({ CODE_EDARA: '', TXT_EDARA: '' });
  const [unitTags, setUnitTags] = useState([]);
  const [dropDownData, setdropDownData] = useState({});
  const [isReadOnlyForm, setIsReadOnlyForm] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    groupID: null,
    area: null,
    unit: null,
    exeEdara: null,
    status: null,
    tag: null,
    openedBy: null,
    closedBy: null,
    reqDescription: null
  });

  const handleOnChange = (value, stateSetter, fieldName) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: value ? null : prevErrors[fieldName]
    }));

    stateSetter(value);
  };

  useEffect(() => {
    masterData();
    equibmentsData();
    handleFormDefaultData();
  }, []);

  const handleFormDefaultData = () => {
    if (props.formLoadData) {
      setGroupID({
        CODE_SHIFT: props.formLoadData.CODE_SHIFT,
        TXT_SHIFT: props.formLoadData.TXT_SHIFT
      });
      setArea(props.formLoadData.area);
      setUnit({
        CODE_UNIT: props.formLoadData.CODE_UNIT,
        TXT_UNIT: props.formLoadData.TXT_UNIT
      });
      setTag({
        TAG: props.formLoadData.EQUIBMENT
      });
      const newOpenedDate = new Date(props.formLoadData.TIME_OPEN);
      const newClosedDate = new Date(props.formLoadData.TIME_CLOSE);
      newOpenedDate.setHours(newOpenedDate.getHours() + 2);
      newClosedDate.setHours(newClosedDate.getHours() + 2);
      setTimeOpened(newOpenedDate.toJSON().slice(0, 16));
      setTimeClosed(newClosedDate.toJSON().slice(0, 16));
      setOpenedBy({
        EMPN: props.formLoadData.OPENED_BY_EMPN,
        USER_NAME: props.formLoadData.OPENED_BY
      });
      if (props.formLoadData.CLOSED_BY_EMPN) {
        setClosedBy({
          EMPN: props.formLoadData.CLOSED_BY_EMPN,
          USER_NAME: props.formLoadData.CLOSED_BY
        });
      } else {
        setClosedBy({ EMPN: null, USER_NAME: '' });
      }
      setExeEdara({
        CODE_EDARA: props.formLoadData.CODE_EDARA,
        TXT_EDARA: props.formLoadData.TXT_EDARA
      });
      setStatus({
        CODE_STATUS: props.formLoadData.CODE_STATUS,
        TXT_STATUS: props.formLoadData.TXT_STATUS
      });
      setReqDescription(props.formLoadData.DESCREPTION_REQUESTED);
      setExeDescription(props.formLoadData.DESCREPTION_RESPONSED);
    }
    setIsReadOnlyForm(props.type === 'view' ? true : false);
  };

  const equibmentsData = async () => {
    const response = await handleRequest('GET', 'api/equibments');
    if (response) {
      setUnitTags(response.result);
    }
  };

  const masterData = async () => {
    const response = await handleRequest('GET', 'api/addShift/masterData');
    if (response) {
      setdropDownData(response.result);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let formValid = true;
    const errors = { ...validationErrors };

    // Validate fields
    if (!groupID.CODE_SHIFT) {
      formValid = false;
      errors.groupID = 'Group ID is required';
    }
    /*     if (!area.CODE_AREA) {
      formValid = false;
      errors.area = 'Area is required';
    } */
    if (!unit.CODE_UNIT) {
      formValid = false;
      errors.unit = 'Unit is required';
    }
    if (!exeEdara.CODE_EDARA) {
      formValid = false;
      errors.exeEdara = 'Executed Department is required';
    }
    if (!status.CODE_STATUS) {
      formValid = false;
      errors.status = 'Status is required';
    }

    if (!tag.TAG) {
      formValid = false;
      errors.tag = 'Equipment Tag is required';
    }
    /*     if (!openedBy.EMPN) {
      formValid = false;
      errors.openedBy = 'Opened By is required';
    } */
    if (!closedBy.EMPN) {
      formValid = false;
      errors.closedBy = 'Closed By is required';
    }

    if (!reqDescription) {
      formValid = false;
      errors.reqDescription = 'Requested Notes is required';
    }

    setValidationErrors(errors);
    if (!formValid) return setIsSubmitting(false);

    const dbOject = {
      groupID: groupID.CODE_SHIFT,
      // area: area.CODE_AREA,
      unit: unit.CODE_UNIT,
      openedBy:  openedBy?.EMPN?? user?.userData?.EMPN ,
      closedBy: closedBy.EMPN,
      descriptionRequested: reqDescription,
      descriptionResponsed: exeDescription,
      status: status.CODE_STATUS,
      tag: tag.TAG,
      exeEdara: exeEdara.CODE_EDARA,
      timeOpened: timeOpened,
      timeClosed: timeClosed
    };

    if (props.formLoadData) {
      dbOject.id = props.formLoadData.ID;
    }
    try {
      await props.formHandlerFuncs.onSubmit(dbOject, props.alertHandler, props.updateLoader);
      props.onCloseForm(false);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={onSubmit} className='container-fluid pt-1'>
      <div className='row form-between-rows-distance'>
        <div className='col'>
          <Autocomplete
            id='shiftGroup'
            options={dropDownData?.shiftGroups?.rows || []}
            readOnly={isReadOnlyForm}
            size='small'
            className={isReadOnlyForm ? 'input-rounded-view' : ''}
            value={groupID?.CODE_SHIFT ? groupID : null}
            isOptionEqualToValue={(option, value) => option.CODE_SHIFT === value.CODE_SHIFT}
            getOptionLabel={(option) => option.TXT_SHIFT}
            onChange={(_, newValue) => {
              if (newValue) handleOnChange(newValue, setGroupID, 'groupID');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Group Id'
                error={!!validationErrors.groupID}
                helperText={validationErrors.groupID}
                variant='outlined'
                InputProps={{
                  ...params.InputProps,
                  readOnly: isReadOnlyForm
                }}
              />
            )}
          />
        </div>

        <div className='col'>
          <Autocomplete
            id='unit'
            options={dropDownData?.units?.rows || []}
            size='small'
            className={isReadOnlyForm ? 'input-rounded-view' : ''}
            readOnly={isReadOnlyForm}
            value={unit?.CODE_UNIT ? unit : null}
            isOptionEqualToValue={(option, value) => option.CODE_UNIT === value.CODE_UNIT}
            getOptionLabel={(option) => option.TXT_UNIT}
            onChange={(_, newValue) => {
              if (newValue) {
                handleOnChange(newValue, setUnit, 'unit');
                handleOnChange(newValue.area, setArea, 'area');
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Unit'
                error={!!validationErrors.unit}
                helperText={validationErrors.unit}
                variant='outlined'
                InputProps={{
                  ...params.InputProps,
                  readOnly: isReadOnlyForm
                }}
              />
            )}
          />
        </div>
      </div>

      <div className='row form-between-rows-distance'>
        <div className='col'>
          <Autocomplete
            id='tag'
            options={unitTags || []}
            value={tag?.TAG ? tag : null}
            size='small'
            className={isReadOnlyForm ? 'input-rounded-view' : ''}
            readOnly={isReadOnlyForm}
            isOptionEqualToValue={(option, value) => option.TAG === value.TAG}
            getOptionLabel={(option) => option.TAG}
            onChange={(_, newValue) => {
              if (newValue) handleOnChange(newValue, setTag, 'tag');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Equipment Tag'
                error={!!validationErrors.tag}
                helperText={validationErrors.tag}
                variant='outlined'
                InputProps={{
                  ...params.InputProps,
                  readOnly: isReadOnlyForm
                }}
              />
            )}
          />
        </div>
        {/* Area */}
        <div className='col'>
          <TextField id='area' label='Area' size='small' value={area ? area : ''} className={'input-rounded-view'} variant='outlined' readOnly={true} disabled={true} />
        </div>
      </div>

      <div className='row form-between-rows-distance'>
        <div className='col'>
          <TextWrapper
            id='timeOpened'
            readOnly={isReadOnlyForm}
            label='Time Opened'
            type='datetime-local'
            value={timeOpened}
            size='small'
            /*             inputProps={{
              max: currentTime.toJSON().slice(0, 16),
            }} */
            onChange={(e) => {
              handleOnChange(e.target.value, setTimeOpened, 'timeOpened');
            }}
            InputLabelProps={{
              shrink: true
            }}
            className={['input-rounded', 'date-picker']}
            viewType={props.type}
          />
        </div>

        <div className='col'>
          <TextWrapper
            id='timeClosed'
            readOnly={isReadOnlyForm}
            label='Time Closed'
            type='datetime-local'
            value={timeClosed}
            onChange={(e) => {
              handleOnChange(e.target.value, setTimeClosed, 'timeClosed');
            }}
            size='small'
            InputLabelProps={{
              shrink: true
            }}
            className={['input-rounded', 'date-picker']}
            viewType={props.type}
          />
        </div>
      </div>

      <div className='row form-between-rows-distance'>
        <div className='col'>
          <TextField id='openedBy' label='Opened By' size='small'  value={openedBy?.USER_NAME?? user?.userData?.USER_NAME} className={'input-rounded-view'} variant='outlined' readOnly={true} disabled={true} />
        </div>

        <div className='col'>
          <Autocomplete
            id='closedBy'
            options={dropDownData.hasOwnProperty('users') ? dropDownData.users.rows : []}
            value={closedBy?.EMPN ? closedBy : null}
            isOptionEqualToValue={(option, value) => option.EMPN === value.EMPN}
            getOptionLabel={(option) => option.USER_NAME}
            onChange={(_, newValue) => {
              if (newValue) handleOnChange(newValue, setClosedBy, 'closedBy');
            }}
            size='small'
            className={isReadOnlyForm ? 'input-rounded-view' : ''}
            readOnly={isReadOnlyForm}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Closed By'
                error={!!validationErrors.closedBy}
                helperText={validationErrors.closedBy}
                variant='outlined'
                InputProps={{
                  ...params.InputProps,
                  readOnly: isReadOnlyForm
                }}
              />
            )}
          />
        </div>
      </div>

      <div className='row form-between-rows-distance'>
        <div className='col'>
          <Autocomplete
            id='department'
            options={dropDownData.hasOwnProperty('exeEdara') ? dropDownData.exeEdara.rows : []}
            value={exeEdara.CODE_EDARA ? exeEdara : null}
            isOptionEqualToValue={(option, value) => option.CODE_EDARA === value.CODE_EDARA}
            size='small'
            className={isReadOnlyForm ? 'input-rounded-view' : ''}
            readOnly={isReadOnlyForm}
            getOptionLabel={(option) => option.TXT_EDARA}
            onChange={(_, newValue) => {
              if (newValue) handleOnChange(newValue, setExeEdara, 'exeEdara');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Executed Department'
                error={!!validationErrors.exeEdara}
                helperText={validationErrors.exeEdara}
                variant='outlined'
                InputProps={{
                  ...params.InputProps,
                  readOnly: isReadOnlyForm
                }}
              />
            )}
          />
        </div>
        <div className='col'>
          <Autocomplete
            id='status'
            options={dropDownData?.status?.rows || []}
            value={status?.CODE_STATUS ? status : null}
            isOptionEqualToValue={(option, value) => option.CODE_STATUS === value.CODE_STATUS}
            size='small'
            className={isReadOnlyForm ? 'input-rounded-view' : ''}
            readOnly={isReadOnlyForm}
            getOptionLabel={(option) => option.TXT_STATUS}
            onChange={(_, newValue) => {
              if (newValue) handleOnChange(newValue, setStatus, 'status');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Status'
                error={!!validationErrors.status}
                helperText={validationErrors.status}
                variant='outlined'
                InputProps={{
                  ...params.InputProps,
                  readOnly: isReadOnlyForm
                }}
              />
            )}
          />
        </div>
      </div>
      <div className='row form-between-rows-distance'>
        <div className='col'>
          <TextField
            id='reqDescription'
            label='Requested Description'
            value={reqDescription}
            onChange={(e) => handleOnChange(e.target.value, setReqDescription, 'reqDescription')}
            error={!!validationErrors.reqDescription}
            helperText={validationErrors.reqDescription}
            multiline
            className={`${isReadOnlyForm ? 'input-rounded-view' : 'multi-line-input-rounded multi-line-text'}`}
            variant='outlined'
            fullWidth
            InputProps={{ readOnly: isReadOnlyForm }}
          />
        </div>
      </div>
      <div className='row form-between-rows-distance'>
        <div className='col'>
          <TextField
            id='exeDescription'
            label='Executed Description'
            className={`${isReadOnlyForm ? 'input-rounded-view' : 'multi-line-input-rounded multi-line-text'}`}
            value={exeDescription}
            onChange={(e) => setExeDescription(e.target.value)}
            multiline
            rows={4}
            variant='outlined'
            fullWidth
            InputProps={{ readOnly: isReadOnlyForm }}
          />
        </div>
      </div>

      <div className='row form-footer'>
        <div className='col d-flex justify-content-center'>
          {!isReadOnlyForm && (
            <button id='saveBtn' className='btn btn-outline-success mx-3' color='primary' type='submit' disabled={isSubmitting || isReadOnlyForm}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          )}
          <button
            type='button'
            className='btn btn-outline-danger mx-3'
            onClick={() => {
              props.onCloseForm(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </Form>
  );
}
