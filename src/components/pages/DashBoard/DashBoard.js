import React, { useEffect, useState } from "react";
import axios from "axios";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";

// import ChartItem from "./ChartItem/ChartItem";
import PriceItem from "../Prices/PricesItem/PriceItem";
import Totals from "./Totals/Totals";
import AddedCommodity from "./AddedCommodity/AddedCommodity";
import { Helmet } from "react-helmet";

// COMPONENTS
import Modal from "./Modal/Modal";

const DashBoard = (props) => {
  const [fixedPrice, setFixedPrice] = useState(false);
  const [modal, setModal] = useState(true);
  const [commodTitle, setCommodTitle] = useState("");
  const [commodPrice, setCommodPrice] = useState(0);

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

  useEffect(() => {
    if (modal) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "visible";
    }
  }, []);

  const toggleCommodityHandler = () => {
    setModal(!modal);
  };

  const addCommodityHandler = (e) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      {modal ? (
        <Modal close={toggleCommodityHandler}>
          <div className="modal-content">
            <form onSubmit={addCommodityHandler}>
              <div className="modal-content--inputs">
                <input
                  onChange={(e) => setCommodTitle(e.target.value)}
                  placeholder="Commodity Name"
                  type="text"
                />
                <input
                  onChange={(e) => setCommodPrice(e.target.value)}
                  placeholder="Amount"
                  type="number"
                  min="0"
                />
              </div>
              <div className="modal-content--btn">
                <button>Add Commodity</button>
              </div>
            </form>
          </div>
        </Modal>
      ) : null}
      <div className="DashBoard">
        <Helmet>
          <title>Dashboard | Royal Port Metals</title>
        </Helmet>
        <div className="search-add-tab">
          <div className="mobile-search-add-tab">
            <div className="search">
              <input placeholder="Search" type="search" name="search" />
            </div>
            <div className="add-item">
              <button onClick={toggleCommodityHandler} className="add-item-btn">
                Add a Comodity
              </button>
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
          <AddedCommodity name="Weekly Buy" price="4000" date="12-24-20" />
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
            <button onClick={toggleCommodityHandler} className="add-item-btn">
              Add a Comodity
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashBoard;
