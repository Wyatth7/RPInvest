import React, { useEffect, useState } from "react";
import axios from "axios";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";

// import ChartItem from "./ChartItem/ChartItem";
import PriceItem from "../Prices/PricesItem/PriceItem";
import Totals from "./Totals/Totals";
import AddedCommodity from "./AddedCommodity/AddedCommodity";

const DashBoard = (props) => {
  const [fixedPrice, setFixedPrice] = useState(false);

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

  useEffect(() => {
    const api = async () => {
      try {
        const res = await axios.get(
          "https://www.apmex.com/silver-price?_=1616812499738"
        );
        console.log(res);
      } catch (err) {
        console.log(err.message);
      }
    };
    api();
  }, []);

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
        <div className="desk-price">
          <div className="prices">
            <PriceItem title="Gold" price="$1,700" change="11.50" />
            <PriceItem title="Silver" price="$25.50" change="0.50" />
            <PriceItem title="Platnium" price="$1,200" change="11.50" />
            <PriceItem title="Copper" price="$8" change="0.20" />
          </div>
        </div>
      </div>
      <div className={`chart-content `}>
        <AddedCommodity name="Weekly Buy" price="400" date="12-24-20" />
        <AddedCommodity name="Weekly Buy" price="400" date="12-24-20" />
        <AddedCommodity name="Weekly Buy" price="400" date="12-24-20" />
        <AddedCommodity name="Weekly Buy" price="400" date="12-24-20" />
        <AddedCommodity name="Weekly Buy" price="400" date="12-24-20" />
        <AddedCommodity name="Weekly Buy" price="400" date="12-24-20" />
        <AddedCommodity name="Weekly Buy" price="400" date="12-24-20" />
        {/* <ChartItem />
        <ChartItem />
        <ChartItem /> */}
      </div>
      <div className="search-add">
        <div className="total-investments">
          <Totals amount="$40,000" />
          <Totals title="Gold" amount="$10,000" />
          <Totals title="Silver" amount="$20,000" />
          <Totals title="Platnium" amount="$10,000" />
        </div>
        <div className="search">
          <input placeholder="Search" type="search" name="search" />
        </div>
        <div className="add-item">
          <button className="add-item-btn">Add a Comodity</button>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
