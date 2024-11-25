import React from 'react';
import Modal from './Modal';
import Button from '@mui/material/Button';
import '../../styles/modal/confirm-modal.css';

export default function ConfirmModal(props) {
  let { cancleClick, confirmClick, open, message, title } = props;
  return (
    <Modal open={open} onSubmit={cancleClick} title={null} onClose={cancleClick} className={'custome-modal-size-xs'}>
      <div className='container-fluid'>
        <div className='row mb-2'>
          <div className='col d-flex justify-content-center'>
            <h4 style={{ fontWeight: '600' }}>{title}</h4>
          </div>
        </div>
        <div className='row mb-2'>
          <div className='col d-flex justify-content-center'>
            <p>{message}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col d-flex justify-content-center'>
            {/* <Button color='primary' className='m-2 rounded-confirm-btn' onClick={() => confirmClick()}>
              {'OK'}
            </Button> */}
            <button type='button' onClick={() => confirmClick()} className='btn btn-danger btn-sm'>
              Close
            </button>
            {/* <Button
              variant="outlined"
              color="secondary"
              className="m-2 rounded-cancel-btn"
              onClick={() => cancleClick()}
            >
              {"No"}
            </Button> */}
          </div>
        </div>
      </div>
    </Modal>
  );
}
