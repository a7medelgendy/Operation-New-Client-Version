import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Is from "@flk/supportive-is";
import Typography from "@mui/material/Typography";
import "../../styles/modal.css";
import "../../styles/form-title-modal.css";

function DefaultModalTitle(props) {
  return (
    <div className="container-fluid modal-title">
      <DialogTitle disableTypography style={{ padding: "0px" }}>
        <div className="container-fluid d-flex flex-row justify-content-between align-items-center">
          <Typography variant="h6" className="title">
            {props.title}
          </Typography>
          {props.onClose ? (
            <IconButton
              aria-label="close"
              className="modal-title-closeBtn"
              onClick={props.onClose}
            >
              <CloseIcon className="close-button"/>
            </IconButton>
          ) : null}
        </div>
      </DialogTitle>
    </div>
  );
}

export default function Modal(props) {
  const {
    size,
    esc,
    title,
    onClose,
    onConfirm,
    backdrop,
    ...otherDialogProps
  } = props;

  // default is passing title as a component
  let modalTitle = title;

  // otherwise, we will render the default modal title component
  if (Is.string(modalTitle)) {
    modalTitle = <DefaultModalTitle title={title} onClose={onClose} />;
  }

  return (
    <div>
      <Dialog
        fullWidth
        disableBackdropClick={!backdrop}
        disableEscapeKeyDown={!esc}
        maxWidth={size}
        onClose={onClose}
        {...otherDialogProps}
      >
        {modalTitle}
        <DialogContent dividers>{props.children}</DialogContent>
      </Dialog>
    </div>
  );
}

Modal.defaultProps = {
  size: "xs",
  esc: true, //if set to false, then the esc button will not close the modal
  backdrop: true, //if set to false, then the backdrop click will not close the modal
  fullScreen: false,
};
