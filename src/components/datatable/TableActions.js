import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

export function dataSheetButton(props) {
  const dataSheetClick = (e) => {
    props.onClick(e, 'data Sheet');
  };
  return (
    <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>Data sheet</Tooltip>}>
      <button onClick={dataSheetClick} className='btn px-2 border-0 action-btn'>
        <i className='fa-regular fa-file-pdf text-danger fs-5'></i>
      </button>
    </OverlayTrigger>
  );
}

export function TableViewButton(props) {
  const viewClick = (e) => {
    props.onClick(e, 'view');
  };

  return (
    <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>Veiw</Tooltip>}>
      <button onClick={viewClick} className='btn px-2 border-0 action-btn'>
        <i className='fa fa-eye text-muted fs-5'></i>
      </button>
    </OverlayTrigger>
  );
}

export function TableEditButton(props) {
  const editClick = (e) => {
    props.onClick(e, 'edit');
  };
  return (
    <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>Edit</Tooltip>}>
      <button className='btn px-2 border-0 action-btn' onClick={editClick}>
        <i className='fas fa-edit text-primary fs-5'></i>
      </button>
    </OverlayTrigger>
  );
}

export function TableDeleteButton(props) {
  const deleteClick = (e) => {
    props.onClick(e, 'remove');
  };
  return (
    <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>Delete</Tooltip>}>
      <button onClick={deleteClick} className='btn border-0  px-2 action-btn'>
        <i className='fa fa-trash text-danger fs-5'></i>
      </button>
    </OverlayTrigger>
  );
}
