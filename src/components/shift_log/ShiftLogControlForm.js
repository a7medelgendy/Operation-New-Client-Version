import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Form from '../form/form';
import VirtualizedAutoComplete from '../form/VirtualizedAutoComplete';
import '../../styles/shift_log/add-shift-log-form.css';
import '../../styles/shift_log/shift-log-form-view.css';
import AutoCompleteValidator from '../form/AutoCompleteValidator';
import { Autocomplete } from '@mui/material';
import { handleRequest } from '../../utilites/handleApiRequest';

function TextWrapper({ viewType, ...props }) {
  const { InputProps, ...restProps } = props;
  //InputLabelProps, InputProps,inputProps
  // console.log(props.className + "-view");

  const classess = props.className.map((ele) => {
    var className = ele;
    if (viewType === 'view') {
      className += '-view';
    }

    return className;
  });

  const className = classess.join(' ');

  return viewType === 'view' ? (
    <TextField
      {...restProps}
      InputProps={{
        readOnly: true
      }}
      className={className}
    />
  ) : (
    <TextField {...props} className={className} />
  );
}

export default function ShiftLogControlForm(props) {
  const [groupID, setGroupID] = useState({ TXT_SHIFT: '', CODE_SHIFT: '' });
  const [area, setArea] = useState({ TXT_AREA: '', CODE_AREA: '' });
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

  const handleOnChange = (value, stateSetter) => {
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

      setArea({
        CODE_AREA: props.formLoadData.CODE_AREA,
        TXT_AREA: props.formLoadData.TXT_AREA
      });

      setUnit({
        CODE_UNIT: props.formLoadData.CODE_UNIT,
        TXT_UNIT: props.formLoadData.TXT_UNIT
      });

      setTag({
        TAG: props.formLoadData.EQUIBMENT
      });

      setTimeOpened(new Date(props.formLoadData.TIME_OPEN).toJSON().slice(0, 16));

      setTimeClosed(new Date(props.formLoadData.TIME_CLOSE).toJSON().slice(0, 16));

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

  const onSubmit = async () => {
    setIsSubmitting(false);

    var dbOject = {
      groupID: groupID.CODE_SHIFT,
      area: area.CODE_AREA,
      unit: unit.CODE_UNIT,
      openedBy: openedBy.EMPN,
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
    } finally {
      setIsSubmitting(true);
    }
  };

  return (
    <Form onSubmit={onSubmit} className='container-fluid pt-1'>
      <div className='row form-between-rows-distance'>
        <div className='col'>
          <AutoCompleteValidator
            id='shiftGroup'
            options={dropDownData.hasOwnProperty('shiftGroups') ? dropDownData.shiftGroups.rows : []}
            readOnly={isReadOnlyForm}
            size='small'
            value={groupID}
            isOptionEqualToValue={(option, value) => {
              return option.CODE_SHIFT === value.CODE_SHIFT;
            }}
            getOptionLabel={(option) => option.TXT_SHIFT}
            onChange={(_, object) => {
              if (object) handleOnChange(object, setGroupID);
            }}
            validation_rules={[{ rule: 'isRequired' }]}
            validation_messages={['Group Id is required']}
            renderInputComponent={(params, error, helperText) => {
              return <TextWrapper {...params} className={['input-rounded']} label='Group Id' error={error} helperText={helperText} viewType={props.type} />;
            }}
          />
        </div>
        <div className='col'>
          <AutoCompleteValidator
            disablePortal
            id='area'
            readOnly={isReadOnlyForm}
            options={dropDownData.hasOwnProperty('areas') ? dropDownData.areas.rows : []}
            value={area}
            isOptionEqualToValue={(option, value) => {
              return option.CODE_AREA === value.CODE_AREA;
            }}
            size='small'
            getOptionLabel={(option) => option.TXT_AREA}
            onChange={(_, object) => {
              if (object) handleOnChange(object, setArea);
            }}
            validation_rules={[{ rule: 'isRequired' }]}
            validation_messages={['Area is required']}
            renderInputComponent={(params, error, helperText) => {
              return <TextWrapper {...params} className={['input-rounded']} label='Area' error={error} helperText={helperText} viewType={props.type} />;
            }}
          />
        </div>
      </div>

      <div className='row form-between-rows-distance'>
        <div className='col'>
          <AutoCompleteValidator
            disablePortal
            id='units'
            options={dropDownData.hasOwnProperty('units') ? dropDownData.units.rows : []}
            readOnly={isReadOnlyForm}
            value={unit}
            isOptionEqualToValue={(option, value) => {
              return option.CODE_UNIT === value.CODE_UNIT;
            }}
            size='small'
            getOptionLabel={(option) => option.TXT_UNIT}
            onChange={(_, object) => {
              if (object) handleOnChange(object, setUnit);
            }}
            validation_rules={[{ rule: 'isRequired' }]}
            validation_messages={['Unit is required']}
            renderInputComponent={(params, error, helperText) => {
              return <TextWrapper {...params} label='Unit' className={['input-rounded']} error={error} helperText={helperText} viewType={props.type} />;
            }}
          />
        </div>
        <div className='col'>
          <VirtualizedAutoComplete
            id='Equipment'
            readOnly={isReadOnlyForm}
            options={unitTags}
            value={tag}
            isOptionEqualToValue={(option, value) => {
              return option.TAG === value.TAG;
            }}
            getOptionLabel={(option) => option.TAG ?? option}
            onChange={(_, object) => {
              if (object) handleOnChange(object, setTag);
            }}
            size='small'
            validation_rules={[{ rule: 'isRequired' }]}
            validation_messages={['Equipment is required']}
            renderInputComponent={(params, error, helperText) => {
              return <TextWrapper {...params} label='Equipment' className={['input-rounded']} error={error} helperText={helperText} viewType={props.type} />;
            }}
          />
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
              handleOnChange(e.target.value, setTimeOpened);
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
              handleOnChange(e.target.value, setTimeClosed);
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
          <AutoCompleteValidator
            disablePortal
            id='openedBy'
            readOnly={isReadOnlyForm}
            options={dropDownData.hasOwnProperty('users') ? dropDownData.users.rows : []}
            value={openedBy}
            isOptionEqualToValue={(option, value) => {
              return option.EMPN === value.EMPN;
            }}
            getOptionLabel={(option) => option.USER_NAME}
            onChange={(_, object) => {
              if (object) handleOnChange(object, setOpenedBy);
            }}
            size='small'
            validation_rules={[{ rule: 'isRequired' }]}
            validation_messages={['Opened by emp is required']}
            renderInputComponent={(params, error, helperText) => {
              return <TextWrapper {...params} label='Opened By' className={['input-rounded']} error={error} helperText={helperText} viewType={props.type} />;
            }}
          />
        </div>

        <div className='col'>
          <Autocomplete
            disablePortal
            id='closedBy'
            readOnly={isReadOnlyForm}
            options={dropDownData.hasOwnProperty('users') ? dropDownData.users.rows : []}
            value={closedBy}
            isOptionEqualToValue={(option, value) => {
              return option.EMPN === value.EMPN;
            }}
            getOptionLabel={(option) => option.USER_NAME}
            onChange={(_, object) => {
              if (object) handleOnChange(object, setClosedBy);
            }}
            size='small'
            renderInput={(params) => {
              return <TextWrapper {...params} label='Closed By' className={['input-rounded']} viewType={props.type} />;
            }}
          />
        </div>
      </div>

      <div className='row form-between-rows-distance'>
        <div className='col'>
          <AutoCompleteValidator
            disablePortal
            id='department'
            readOnly={isReadOnlyForm}
            options={dropDownData.hasOwnProperty('exeEdara') ? dropDownData.exeEdara.rows : []}
            value={exeEdara}
            isOptionEqualToValue={(option, value) => {
              return option.CODE_EDARA === value.CODE_EDARA;
            }}
            size='small'
            getOptionLabel={(option) => option.TXT_EDARA}
            onChange={(_, object) => {
              if (object) handleOnChange(object, setExeEdara);
            }}
            validation_rules={[{ rule: 'isRequired' }]}
            validation_messages={['Executed Department is required']}
            renderInputComponent={(params, error, helperText) => {
              return <TextWrapper {...params} label='Executed Department' className={['input-rounded']} error={error} helperText={helperText} viewType={props.type} />;
            }}
          />
        </div>
        <div className='col'>
          <AutoCompleteValidator
            disablePortal
            id='status'
            readOnly={isReadOnlyForm}
            options={dropDownData.hasOwnProperty('status') ? dropDownData.status.rows : []}
            value={status}
            isOptionEqualToValue={(option, value) => {
              return option.CODE_STATUS === value.CODE_STATUS;
            }}
            size='small'
            getOptionLabel={(option) => option.TXT_STATUS}
            onChange={(_, object) => {
              if (object) handleOnChange(object, setStatus);
            }}
            validation_rules={[{ rule: 'isRequired' }]}
            validation_messages={['Status is required']}
            renderInputComponent={(params, error, helperText) => {
              return <TextWrapper {...params} label='Status' className={['input-rounded']} error={error} helperText={helperText} viewType={props.type} />;
            }}
          />
        </div>
      </div>

      <div className='row form-between-rows-distance'>
        <div className='col'>
          <TextWrapper
            className={['multi-line-input-rounded', 'multi-line-text']}
            id='outlined-multiline-static'
            label='Requested Notes...'
            value={reqDescription}
            onChange={(e) => {
              handleOnChange(e.target.value, setReqDescription);
            }}
            viewType={props.type}
          />
        </div>
      </div>

      <div className='row form-between-rows-distance'>
        <div className='col'>
          <TextWrapper
            className={['multi-line-input-rounded', 'multi-line-text']}
            id='outlined-multiline-static-01'
            label='Executed Notes...'
            multiline
            rows={4}
            value={exeDescription}
            onChange={(e) => {
              handleOnChange(e.target.value, setExeDescription);
            }}
            viewType={props.type}
          />
        </div>
      </div>

      <div className='row'>
        <div className='col d-flex justify-content-center'>
          {!isReadOnlyForm && (
            <button type='submit' id='saveBtn' className='btn btn-outline-success mx-3' disabled={isSubmitting}>
              Save
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
