import React from "react";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";

const AddedCommodity = (props) => {
  return (
    <div className="AddedCommodity">
      <div className="info">
        <h1 className="name">{props.name}</h1>
        <div>
          <h1 className="price">${props.price}</h1>
          <FontAwesomeIcon className="icon" icon={solid.faSortUp} />
        </div>
        <h3 className="date">{props.date}</h3>
      </div>
      <div className="edit-delete">
        <button className="edit">Edit</button>
        <button className="delete">Delete</button>
      </div>
    </div>
  );
};

export default AddedCommodity;
