import React, { useEffect, useMemo, useState } from "react";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";

// GRAPHS
import {
  Crosshair,
  HorizontalGridLines,
  LineMarkSeries,
  LineSeries,
  LineSeriesCanvas,
  MarkSeries,
  XAxis,
  XYPlot,
  YAxis,
} from "react-vis";
import "./../../../../../node_modules/react-vis/dist/style.css";

const ChartItem = (props) => {
  const [width, setWidth] = useState(238);
  const [height, setHeight] = useState(340);
  const [resize, setResize] = useState(false);

  const catchResize = (e) => {
    e.preventDefault();
    setResize(!resize);
  };

  useEffect(() => {
    window.addEventListener("resize", catchResize);
    return () => window.removeEventListener("resize", catchResize);
  });

  useEffect(() => {
    const width = document.getElementById("chartItem").offsetWidth;
    setWidth(width - 30);
  }, [setWidth, setHeight, resize]);

  return (
    <div className="ChartItem">
      <div className="name-price">
        <div className="investment--name">
          <p>Silver</p>
        </div>
        <div className="investment--value">
          <p className="amount">$10,000</p>
          <FontAwesomeIcon className="arrow-icon" icon={solid.faSortUp} />
        </div>
      </div>
      <div id="chartItem" className="chart-content">
        <XYPlot
          className="chart-plot"
          width={width}
          height={height}
          margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
        >
          <XAxis />
          <Crosshair />
          <LineSeries
            className="chart"
            data={[
              { x: 1, y: 0 },
              { x: 2, y: 3 },
              { x: 3, y: 4 },
              { x: 4, y: 5 },
            ]}
          />
        </XYPlot>
      </div>
    </div>
  );
};

export default ChartItem;
