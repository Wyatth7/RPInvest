import React from "react";

const DeleteModal = (props) => {
  return (
    <div
      className="edit-modal"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="title delete">
        <h1>Delete your commodity tab.</h1>
        <p>
          Once you delete a commodity, you will not be able to access it again,
          are you sure you want to delete it?
        </p>
      </div>
      <form onSubmit={props.submit}>
        <button>Delete tab</button>
      </form>
    </div>
  );
};

export default DeleteModal;
