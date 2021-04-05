import React from "react";

const Totals = (props) => {
  return (
    <div className="Totals">
      <h2>Total {props.title} Investments</h2>
      <div className="amount">
        <h1>{props.amount}</h1>
        <p>{props.change}</p>
      </div>
    </div>
  );
};

export default Totals;
