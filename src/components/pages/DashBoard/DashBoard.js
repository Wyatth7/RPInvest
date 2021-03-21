import React, { useEffect, useState } from "react";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";

import ChartItem from "./ChartItem/ChartItem";

const DashBoard = (props) => {
  const [fixedPrice, setFixedPrice] = useState("");

  const scrollListener = (e) => {
    e.preventDefault();
    window.pageYOffset >= 157
      ? setFixedPrice("fixed-price")
      : setFixedPrice("");
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  });

  return (
    <div className="DashBoard">
      <div className="search-add-tab">
        <div className="mobile-search-add-tab">
          <div className="search">
            <input placeholder="Search" type="search" name="search" />
          </div>
          <div className="add-item">
            <button className="add-item-btn">Add a Comodity</button>
          </div>
        </div>
        <div className="desk-search-add-tab"></div>
      </div>
      <div className="price-tab">
        <div className={`mobile-price ${fixedPrice}`}>
          <div className="price-btn">
            <button>Prices</button>
          </div>
          <div className="your-total">
            <p>$23,480</p>
            <div>
              <FontAwesomeIcon className="arrow-icon" icon={solid.faSortUp} />
            </div>
          </div>
        </div>
        <div className="desk-price"></div>
      </div>
      <div
        className={`chart-content ${
          fixedPrice.length > 1 ? "new-chart-content" : ""
        }`}
      >
        <ChartItem />
        <ChartItem />
        <ChartItem />
        <ChartItem />
      </div>
    </div>
  );
};

export default DashBoard;
