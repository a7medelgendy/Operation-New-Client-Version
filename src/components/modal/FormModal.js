import React from "react";
import Modal from "./Modal";
import "../../styles/modal.css";

function FormTitle(props) {
  return <h3>{props.title}</h3>;
}

export default function FormModal(props) {
  let { cancleClick, confirmClick, open, title } = props;
  return (
    <Modal
      // backdrop={false}
      open={open}
      onSubmit={confirmClick}
      title={title}
      onClose={cancleClick}
      className={"custome-modal-size-md"}
    >
      <div className="container-fluid">
        {/* <div className="row p-1" style={{backgroundColor:"blue"}}>
          <div className="d-flex justify-content-start" style={{backgroundColor:"red"}}>
            <FormTitle title={title}/>
          </div>
        </div> */}
        <div className="row">{props.children}</div>
      </div>
    </Modal>
  );
}
