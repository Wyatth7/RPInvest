import React from "react";
import BaseLinks from "./NavLinks/BaseLinks/BaseLinks";
import LoginLink from "./NavLinks/LoginLink/LoginLink";
import HashLinks from "./NavLinks/HashLinks/HashLinks";

import firebase from "firebase/app";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router";

const Nav = (props) => {
  const onLogoutHandler = async () => {
    await firebase.auth().signOut();
    props.history.push("/");
    window.location.reload();
  };

  return (
    <div className="Nav">
      <div className="nav-logo">
        <BaseLinks to="/" title="RPMetals" />
      </div>
      <div className="nav-bars">
        <FontAwesomeIcon icon={solid.faBars} />
      </div>
      <div className="nav-items">
        <HashLinks
          className="generic-btn"
          to="/#how-it-works"
          title="How It Works"
        />
        <HashLinks className="generic-btn" to="/#about" title="About" />
        <HashLinks className="generic-btn" to="/#contact" title="Contact" />
        {props.auth ? (
          <React.Fragment>
            <BaseLinks
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
          <LoginLink className="login-btn" title="Login" link="login" />
        )}
      </div>
    </div>
  );
};

export default withRouter(Nav);
