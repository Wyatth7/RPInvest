import React, { useState } from "react";

// FIREBASE
import firebase from "firebase/app";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router";

// COMPONENTS
import BaseLinks from "./NavLinks/BaseLinks/BaseLinks";
import LoginLink from "./NavLinks/LoginLink/LoginLink";
import HashLinks from "./NavLinks/HashLinks/HashLinks";
import Modal from "./../Modal/Modal";

const Nav = (props) => {
  const [mobileContent, setMobileContent] = useState(false);

  const onLogoutHandler = async () => {
    await firebase.auth().signOut();
    props.history.push("/");
    window.location.reload();
  };

  const toggleMobileNavHandler = () => {
    setMobileContent(!mobileContent);
  };

  const disableModalToggleDesktop = () => {
    if (mobileContent) {
      toggleMobileNavHandler();
    }
  };

  const navContent = (
    <React.Fragment>
      <HashLinks
        onClick={disableModalToggleDesktop}
        className="generic-btn"
        to="/#how-it-works"
        title="How It Works"
      />
      <HashLinks
        onClick={disableModalToggleDesktop}
        className="generic-btn"
        to="/#about"
        title="About"
      />
      <HashLinks
        onClick={disableModalToggleDesktop}
        className="generic-btn"
        to="/#contact"
        title="Contact"
      />
      {props.auth ? (
        <React.Fragment>
          <BaseLinks
            onClick={disableModalToggleDesktop}
            className="generic-btn"
            to="/dashboard"
            title="Dashboard"
          />
          <button
            onClick={onLogoutHandler}
            className="logout login-btn LoginLink"
          >
            <p>Logout</p>
          </button>
        </React.Fragment>
      ) : (
        <LoginLink
          onClick={disableModalToggleDesktop}
          className="login-btn"
          title="Login"
          link="login"
        />
      )}
    </React.Fragment>
  );

  return (
    <div className="Nav">
      {mobileContent ? (
        <Modal nav close={toggleMobileNavHandler}>
          <div className="mobile-nav">{navContent}</div>
        </Modal>
      ) : null}
      <div className="nav-logo">
        <BaseLinks to="/" title="RPMetals" />
      </div>
      <div className="nav-bars">
        <FontAwesomeIcon onClick={toggleMobileNavHandler} icon={solid.faBars} />
      </div>
      <div className={"nav-items"}>{navContent}</div>
    </div>
  );
};

export default withRouter(Nav);
