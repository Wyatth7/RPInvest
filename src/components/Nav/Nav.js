import React from "react";
import BaseLinks from "./NavLinks/BaseLinks/BaseLinks";
import LoginLink from "./NavLinks/LoginLink/LoginLink";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";

const Nav = (props) => {
  return (
    <div className="Nav">
      <div className="nav-logo">
        <BaseLinks to="/" title="RPInvest" />
      </div>
      <div className="nav-bars">
        <FontAwesomeIcon icon={solid.faBars} />
      </div>
      <div className="nav-items">
        <BaseLinks className="generic-btn" to="/about" title="About" />
        <BaseLinks
          className="generic-btn"
          to="/how-it-works"
          title="How It Works"
        />
        <BaseLinks className="generic-btn" to="/contact" title="Contact" />
        <BaseLinks className="generic-btn" to="/dashboard" title="Dashboard" />

        <LoginLink className="login-btn" title="Login" />
      </div>
    </div>
  );
};

export default Nav;
