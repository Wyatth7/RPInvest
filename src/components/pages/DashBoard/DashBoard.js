import React, { useEffect, useState } from "react";
import axios from "axios";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";

import ChartItem from "./ChartItem/ChartItem";
import PriceItem from "../Prices/PricesItem/PriceItem";

const DashBoard = (props) => {
  const [fixedPrice, setFixedPrice] = useState(false);
  const [spotData, setSpot] = useState("");

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
        setSpot(res.data);
        console.log(res);
      } catch (err) {
        console.log(err.message);
      }
    };
    api();
  }, [setSpot]);

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
        <ChartItem />
        <ChartItem />
        <ChartItem />
      </div>
      <div className="search-add">
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
