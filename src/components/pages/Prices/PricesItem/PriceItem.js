import React from "react";
import formatNumberString from "../../../../utils/formatNumberString";

const PriceItem = (props) => {
  return (
    <div className="PriceItem">
      <p className="name">{props.title}</p>
      <div>
        <p className="price">
          ${props.price ? formatNumberString(props.price) : 0.0}
        </p>
        <p className="change">{props.change}</p>
      </div>
    </div>
  );
};

export default PriceItem;
