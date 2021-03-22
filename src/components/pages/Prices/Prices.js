import React from "react";

// COMPONENTS
import PriceItem from "./PricesItem/PriceItem";

const Prices = (props) => {
  return (
    <div className="Prices">
      <PriceItem title="Gold" price="$1,700" change="11.50" />
      <PriceItem title="Silver" price="$26" change="0.20" />
      <PriceItem title="Platinum" price="$1,200" change="11.00" />
      <PriceItem title="Copper" price="$8" change="0.10" />
    </div>
  );
};

export default Prices;
