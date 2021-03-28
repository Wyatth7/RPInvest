import React from "react";
import { NavLink } from "react-router-dom";

const PageNotFound = (props) => {
  return (
    <div className="PageNotFound">
      <h1>The page you are looking for does not exist</h1>
      <NavLink className="err-link" to="/">
        <h2>Back to civilization</h2>
      </NavLink>
    </div>
  );
};

export default PageNotFound;
