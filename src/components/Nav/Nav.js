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
        <p>RPInvest</p>
      </div>
      <div className="nav-bars">
        <FontAwesomeIcon icon={solid.faBars} />
      </div>
      <div className="nav-items">
        <BaseLinks to="/about" title="About" />
        <LoginLink title="Login" />
      </div>
    </div>
  );
};

export default Nav;
