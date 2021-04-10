import React, { useEffect, useState } from "react";

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

const DashBoard = (props) => {
  const [pageData, setPageData] = useState({});
  const [fixedPrice, setFixedPrice] = useState(false);
  const [modal, setModal] = useState(false);
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

  useEffect(() => {
    const call = async () => {
      try {
        const call = await Ajax.getDashboardData();
        setPageData(call.data.userData);
      } catch (err) {
        console.log(err);
      }
    };

    call();
  }, [setPageData, reRender]);

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  });

  useEffect(() => {
    if (modal) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "visible";
    }
  }, [modal]);

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
    }
  };

  const toggleModal = () => {
    setModal(!modal);
    setEditModal(false);
    setCommodModal(false);
    setDeleteModal(false);
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

  let modalType;

  if (commodModal) {
    modalType = (
      <AddCommod
        submit={onAddCommodityHandler}
        price={(e) => setCommodPrice(e.target.value)}
        type={(e) => setCommodType(e.target.value)}
        title={(e) => setCommodTitle(e.target.value)}
      />
    );
  } else if (editModal) {
    modalType = (
      <EditModal
        title={(e) => setCommodTitle(e.target.value)}
        price={(e) => setCommodPrice(e.target.value)}
        submit={onEditHandler}
      />
    );
  } else if (deleteModal) {
    modalType = <DeleteModal submit={onDeleteHandler} />;
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
              <button>Prices</button>
            </div>
            <div className="your-total">
              {pageData ? <p>${pageData.total}</p> : <p>$0</p>}
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
          {pageData.commodities
            ? pageData.commodities.map((el) => (
                <AddedCommodity
                  key={el._id}
                  id={el._id}
                  type={el.type}
                  name={el.title}
                  price={el.amount}
                  date={el.date}
                  change={el.change}
                  edit={toggleEditHandler}
                  delete={toggleDeleteHandler}
                />
              ))
            : null}
        </div>
        <div className="search-add">
          <div className="total-investments">
            {pageData ? (
              <React.Fragment>
                <Totals amount={pageData.total} />
                <Totals title="Gold" amount={pageData.gold} />
                <Totals title="Silver" amount={pageData.silver} />
                <Totals title="Platinum" amount={pageData.platinum} />
                <Totals title="Palladium" amount={pageData.palladium} />
              </React.Fragment>
            ) : null}
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

export default withRouter(DashBoard);
