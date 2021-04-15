import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import Ajax from "./../../../utils/ajax";

// COMPONENTS
import PriceItem from "./PricesItem/PriceItem";

const Prices = (props) => {
  const [priceData, setPriceData] = useState({});

  useEffect(() => {
    const getPrices = async () => {
      const prices = await Ajax.getMetalPrices();

      setPriceData(prices.data);
    };

    getPrices();
  }, [setPriceData]);

  return (
    <div className="Prices">
      {priceData ? (
        <React.Fragment>
          <PriceItem
            title="Gold"
            price={priceData.gold}
            change={priceData.goldChange}
          />
          <PriceItem
            title="Silver"
            price={priceData.silver}
            change={priceData.silverChange}
          />
          <PriceItem
            title="Platnium"
            price={priceData.platinum}
            change={priceData.platinumChange}
          />
          <PriceItem
            title="Copper"
            price={priceData.palladium}
            change={priceData.palladiumChange}
          />
        </React.Fragment>
      ) : (
        <div className="error">
          <h1>Could not get price data.</h1>
          <p>Reload the page or come back later to see metal prices.</p>
        </div>
      )}
    </div>
  );
};

export default Prices;
