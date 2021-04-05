import React from "react";

const EditModal = (props) => {
  return (
    <div className="edit-modal">
      <div className="title">
        <h1>Edit your commodity tab.</h1>
        <p>
          Did you liquidate, purchase, or make a mistake while creating your
          commodity tab? Fill out the form to edit your commodity tab.
        </p>
      </div>
      <form onSubmit={props.submit}>
        <div className="inputs">
          <input
            type="text"
            onChange={props.title}
            placeholder="Change title"
          />
          <input
            type="text"
            onChange={props.price}
            placeholder="Change amount"
          />
        </div>
        <button>Submit changes</button>
      </form>
    </div>
  );
};

export default EditModal;
