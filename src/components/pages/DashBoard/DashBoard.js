import React, { useCallback, useEffect, useState } from "react";

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
import formatNumberString from "./../../../utils/formatNumberString";

const DashBoard = (props) => {
  const [priceData, setPriceData] = useState({});
  const [userData, setUserData] = useState({});
  const [userCommodities, setUserCommodities] = useState([]);
  const [commodSearch, setCommodSearch] = useState("");
  const [userPrices, setUserPrices] = useState({});
  const [modal, setModal] = useState(false);
  const [modalErr, setModalErr] = useState(false);
  const [reRender, setRerender] = useState(0);
  const [commodModal, setCommodModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [commodSelected, setCommodSelected] = useState("");
  const [commodTitle, setCommodTitle] = useState("");
  const [commodPrice, setCommodPrice] = useState(0);
  const [commodType, setCommodType] = useState("");

  // BASE AJAX CALLS & useEffects
  useEffect(() => {
    const call = async () => {
      try {
        const dashboardData = await Ajax.getDashboardData();
        console.log(dashboardData.data);
        setUserData(dashboardData.data.userData);
        setUserCommodities(dashboardData.data.userData.commodities);
      } catch (err) {
        console.error(
          "Could not get data from server, refresh the page or come back later.",
          err
        );
      }
    };

    call();
  }, [setUserData, setUserCommodities, reRender]);

  useEffect(() => {
    const call = async () => {
      const priceData = await Ajax.getMetalPrices();
      setPriceData(priceData.data);
    };
    call();
  }, [setPriceData]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        if (commodSearch !== "") {
          const searchData = await Ajax.searchString(commodSearch);
          setUserCommodities(searchData.data.userData);
        } else {
          setRerender(Math.random());
        }
      } catch (err) {
        console.error("Could not get data from search.");
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [commodSearch, setUserCommodities, setRerender]);

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
    if (!userData && !priceData) {
      return null;
    }

    let totals = {
      gold: 0,
      silver: 0,
      platinum: 0,
      palladium: 0,
    };

    let totalValue = 0;
    console.log(priceData);
    console.log(userData);

    if (priceData && userData) {
      Object.keys(totals).forEach((el) => {
        // convert price
        const price = convertPrice(userData[el], priceData[el]);

        // add price to totalValue
        totalValue += price;

        // push price to object
        totals[el] = formatNumberString(price.toFixed(2));
      });
    }

    setUserPrices({
      ...totals,
      total: formatNumberString(totalValue.toFixed(2)),
    });
  }, [priceData, userData, convertPrice]);

  // GET PRICE FROM OZs
  useEffect(() => {
    totalsConversion();
  }, [totalsConversion]);

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
      setRerender(Math.random());
    } catch (err) {
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
              <input
                onChange={(e) => setCommodSearch(e.target.value)}
                placeholder="Search"
                type="search"
                name="search"
              />
            </div>
            <div className="add-item">
              <button onClick={toggleCommodityHandler} className="add-item-btn">
                Add Comodity
              </button>
            </div>
          </div>
          <div className="desk-search-add-tab"></div>
        </div>
        <div className="price-tab">
          <div className={`mobile-price`}>
            <div className="price-btn">
              <NavLink className="price-link" to="/prices">
                Prices
              </NavLink>
            </div>
            <div className="your-total">
              {userData ? <p>${userPrices.total}</p> : <p>$0</p>}
            </div>
          </div>
          <div className="desk-price">
            {priceData ? (
              <div className="prices">
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
              </div>
            ) : (
              <div className="no-commodity-found">
                <h1>Could not find metals prices</h1>
              </div>
            )}
          </div>
        </div>
        <div className={`chart-content `}>
          {userCommodities ? (
            userCommodities.length > 0 ? (
              userCommodities.map((el) => (
                <AddedCommodity
                  key={el._id}
                  id={el._id}
                  type={el.type}
                  name={el.title}
                  price={convertPrice(el.amount, priceData[el.type])}
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
            {userData ? (
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
