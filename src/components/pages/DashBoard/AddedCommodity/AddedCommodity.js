import React from "react";

// ICONS

const AddedCommodity = (props) => {
  return (
    <div id={props.id} className="AddedCommodity">
      <div className="info">
        <h1 className="name">{props.name}</h1>
        <div>
          <h1 className="price">${props.price}</h1>
          <p>{props.change}</p>
        </div>
        <h3 className="date">{props.date}</h3>
      </div>
      <div className="edit-delete">
        <button onClick={() => props.edit(props.id)} className="edit">
          Edit
        </button>
        <button onClick={() => props.delete(props.id)} className="delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default AddedCommodity;
