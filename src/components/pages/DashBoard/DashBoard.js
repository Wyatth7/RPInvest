import React from "react";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
import ChartItem from "./ChartItem/ChartItem";

const DashBoard = (props) => {
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
        <div className="mobile-price">
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
      <div className="chart-content">
        <ChartItem />
      </div>
    </div>
  );
};

export default DashBoard;
