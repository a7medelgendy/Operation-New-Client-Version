import React from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import Tooltip from "reactor/components/tooltip";
import DeleteIcon from '@mui/icons-material/Delete';

export function TableAddButton(props) {
  return (
    <IconButton>
      <AddCircleIcon fontSize='large' color='primary' />
    </IconButton>
  );
}

export function TableViewButton(props) {
  const viewClick = (e) => {
    props.onClick(e, 'view');
  };

  return (
    <IconButton onClick={viewClick}>
      <VisibilityIcon />
    </IconButton>
  );
}

export function TableEditButton(props) {
  const editClick = (e) => {
    props.onClick(e, 'edit');
  };
  return (
    <IconButton onClick={editClick}>
      <EditIcon color='primary' />
    </IconButton>
  );
}

export function TableDeleteButton(props) {
  const deleteClick = (e) => {
    props.onClick(e, 'remove');
  };
  return (
    <IconButton onClick={deleteClick}>
      <DeleteIcon color='error' />
    </IconButton>
  );
}
