import React from "react";

const PriceItem = (props) => {
  return (
    <div className="PriceItem">
      <p className="name">{props.title}</p>
      <div>
        <p className="price">${props.price}</p>
        <p className="change">{props.change}</p>
      </div>
    </div>
  );
};

export default PriceItem;
