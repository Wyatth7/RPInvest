import React, { useMemo } from "react";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";

// GRAPHS
import { Chart } from "react-charts";

const ChartItem = (props) => {
  return (
    <div className="ChartItem">
      <div className="name-price">
        <div className="investment--name">
          <h2>Silver</h2>
        </div>
        <div className="investment--value">
          <p className="amount">$10,000</p>
          <FontAwesomeIcon className="arrow-icon" icon={solid.faSortUp} />
        </div>
      </div>
      <div className="chart-content"></div>
    </div>
  );
};

export default ChartItem;
