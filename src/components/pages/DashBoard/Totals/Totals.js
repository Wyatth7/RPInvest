import React from "react";

// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";

const Totals = (props) => {
  return (
    <div className="Totals">
      <h2>Total {props.title} Investments</h2>
      <div className="amount">
        <h1>{props.amount}</h1>
        <FontAwesomeIcon className="icon" icon={solid.faSortUp} />
      </div>
    </div>
  );
};

export default Totals;
