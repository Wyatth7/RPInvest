import React from "react";
import { NavLink, withRouter } from "react-router-dom";
// import SectionElement from "../HomePage/SectionElements/SectionElement";

const Profile = (props) => {
  return (
    <div className="Profile">
      <div className="Profile__header">
        <h1 className="header">Profile</h1>
        <div className="border-line"></div>
      </div>
      <div className="Profile__content">
        <div className="Profile__content--username">
          <h2>Wyatt Hardin</h2>
        </div>
        <div className="Profile__content--email-pass">
          <p className="email">foobartown@gmail.com</p>
          <NavLink to="/home" className="reset">
            Reset Password
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Profile);
