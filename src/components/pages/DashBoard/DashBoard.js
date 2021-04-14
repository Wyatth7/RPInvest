import React, { useCallback, useEffect, useState } from "react";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";

// import ChartItem from "./ChartItem/ChartItem";
import PriceItem from "../Prices/PricesItem/PriceItem";
import Totals from "./Totals/Totals";
import AddedCommodity from "./AddedCommodity/AddedCommodity";
import { Helmet } from "react-helmet";

// COMPONENTS
import Modal from "./../../Modal/Modal";
import { withRouter } from "react-router";
import Ajax from "../../../utils/ajax";
import AddCommod from "./../../Modal/ModalContent/AddCommod";
import EditModal from "./../../Modal/ModalContent/EditModal";
import DeleteModal from "./../../Modal/ModalContent/DeleteModal";
import { NavLink } from "react-router-dom";

const DashBoard = (props) => {
  const [pageData, setPageData] = useState({});
  const [commodSearch, setCommodSearch] = useState("");
  const [userPrices, setUserPrices] = useState({});
  const [fixedPrice, setFixedPrice] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalErr, setModalErr] = useState(false);
  const [reRender, setRerender] = useState(false);
  const [commodModal, setCommodModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [commodSelected, setCommodSelected] = useState("");
  const [commodTitle, setCommodTitle] = useState("");
  const [commodPrice, setCommodPrice] = useState(0);
  const [commodType, setCommodType] = useState("");

  const scrollListener = (e) => {
    e.preventDefault();
    window.pageYOffset >= 157
      ? setFixedPrice("fixed-price")
      : setFixedPrice("");
  };

  // BASE AJAX CALLS & useEffects
  useEffect(() => {
    const call = async () => {
      try {
        const call = await Ajax.getDashboardData();
        setPageData(call.data);
      } catch (err) {
        console.log(err);
      }
    };

    call();
  }, [setPageData, reRender]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        console.log(await Ajax.searchString(commodSearch));
      } catch (err) {
        console.log(err);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [commodSearch]);

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  });

  const roundToTwo = useCallback(
    (n, fixed) => ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed),
    []
  );

  /**
   * Converts from ounces to total dollar price
   * @param {Number} oz Amount of metal(in ounces) that a user owns
   * @param {Number} pricePerOz Price of one ounce of metal based on the oz given
   * @returns {Number} Dollar amount
   */
  const convertPrice = useCallback(
    (oz, pricePerOz) => {
      return roundToTwo(oz * pricePerOz, 2);
    },
    [roundToTwo]
  );

  const totalsConversion = useCallback(() => {
    if (!pageData.userData) {
      return;
    }

    let totals = {
      gold: 0,
      silver: 0,
      platinum: 0,
      palladium: 0,
    };

    let totalValue = 0;

    Object.keys(totals).forEach((el) => {
      // convert price
      const price = convertPrice(pageData.userData[el], pageData.priceData[el]);

      // add price to totalValue
      totalValue += price;

      // push price to object
      totals[el] = price;
    });

    setUserPrices({ ...totals, total: totalValue });
  }, [pageData, convertPrice]);

  // GET PRICE FROM OZs
  useEffect(() => {
    totalsConversion();
  }, [pageData, totalsConversion]);

  // MODALS HANDLERS
  const onAddCommodityHandler = async (e) => {
    e.preventDefault();

    try {
      Ajax.createCommodityItem({
        title: commodTitle,
        amount: commodPrice,
        type: commodType,
      });
      setModal(!modal);
      setCommodModal(false);
      setRerender(!reRender);
    } catch (err) {
      console.log(err);
      setModalErr(true);
    }
  };

  const onEditHandler = async (e) => {
    e.preventDefault();

    try {
      await Ajax.editCommodityTab({
        title: commodTitle,
        amount: commodPrice,
        id: commodSelected,
        type: commodType,
      });
      setModal(!modal);
      setEditModal(false);
      setRerender(!reRender);
    } catch (err) {
      console.log(err);
      setModalErr(true);
    }
  };

  const onDeleteHandler = async (e) => {
    e.preventDefault();

    try {
      await Ajax.deleteCommodityTab({ id: commodSelected, type: commodType });
      setModal(!modal);
      setDeleteModal(false);
      setRerender(!reRender);
    } catch (err) {
      console.log(err);
      setModalErr(true);
    }
  };

  // MODAL TOGGLES
  const toggleModal = () => {
    setModal(!modal);
    setEditModal(false);
    setCommodModal(false);
    setDeleteModal(false);
    setModalErr(false);
  };

  const toggleCommodityHandler = () => {
    setCommodModal(true);
    setModal(!modal);
  };

  const toggleEditHandler = (id, type) => {
    setEditModal(true);
    setCommodSelected(id);
    setCommodType(type);
    setModal(!modal);
  };

  const toggleDeleteHandler = (id, type) => {
    setDeleteModal(true);
    setCommodSelected(id);
    setCommodType(type);
    setModal(!modal);
  };

  // MODAL TYPE SELECT
  let modalType;

  if (commodModal) {
    modalType = (
      <AddCommod
        err="Could not add commodity."
        isError={modalErr}
        submit={onAddCommodityHandler}
        price={(e) => setCommodPrice(e.target.value)}
        type={(e) => setCommodType(e.target.value)}
        title={(e) => setCommodTitle(e.target.value)}
      />
    );
  } else if (editModal) {
    modalType = (
      <EditModal
        isError={modalErr}
        err="Could not edit your Commodity item."
        title={(e) => setCommodTitle(e.target.value)}
        price={(e) => setCommodPrice(e.target.value)}
        submit={onEditHandler}
      />
    );
  } else if (deleteModal) {
    modalType = (
      <DeleteModal
        isError={modalErr}
        err="There was a problem deleting your commodity."
        submit={onDeleteHandler}
      />
    );
  }

  return (
    <React.Fragment>
      {modal ? <Modal close={toggleModal}>{modalType}</Modal> : null}
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
              <NavLink className="price-link" to="/prices">
                Prices
              </NavLink>
            </div>
            <div className="your-total">
              {pageData.userData ? (
                <p>${pageData.userData.total}</p>
              ) : (
                <p>$0</p>
              )}
              <div>
                <FontAwesomeIcon className="arrow-icon" icon={solid.faSortUp} />
              </div>
            </div>
          </div>
          <div className="desk-price">
            {pageData.priceData ? (
              <div className="prices">
                <PriceItem
                  title="Gold"
                  price={pageData.priceData.gold}
                  change={pageData.priceData.goldChange}
                />
                <PriceItem
                  title="Silver"
                  price={pageData.priceData.silver}
                  change={pageData.priceData.silverChange}
                />
                <PriceItem
                  title="Platnium"
                  price={pageData.priceData.platinum}
                  change={pageData.priceData.platinumChange}
                />
                <PriceItem
                  title="Copper"
                  price={pageData.priceData.palladium}
                  change={pageData.priceData.palladiumChange}
                />
              </div>
            ) : (
              <div className="no-commodity-found">
                <h1>Could not find metals prices</h1>
              </div>
            )}
          </div>
        </div>
        <div className={`chart-content `}>
          {pageData.userData ? (
            pageData.userData.commodities.length > 0 ? (
              pageData.userData.commodities.map((el) => (
                <AddedCommodity
                  key={el._id}
                  id={el._id}
                  type={el.type}
                  name={el.title}
                  price={convertPrice(el.amount, pageData.priceData[el.type])}
                  date={el.date}
                  change={el.change}
                  edit={toggleEditHandler}
                  delete={toggleDeleteHandler}
                />
              ))
            ) : (
              <div className="no-commodity-found">
                <h1>No commodities yet?</h1>
                <p>Add commodities to get started tracking!</p>
              </div>
            )
          ) : null}
        </div>
        <div className="search-add">
          <div className="total-investments">
            {pageData.userData ? (
              <React.Fragment>
                <Totals amount={userPrices.total} />
                <Totals title="Gold" amount={userPrices.gold} />
                <Totals title="Silver" amount={userPrices.silver} />
                <Totals title="Platinum" amount={userPrices.platinum} />
                <Totals title="Palladium" amount={userPrices.palladium} />
              </React.Fragment>
            ) : null}
          </div>
          <div className="search">
            <input
              onChange={(e) => setCommodSearch(e.target.value)}
              placeholder="Search"
              type="search"
              name="search"
            />
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

export default withRouter(DashBoard);
