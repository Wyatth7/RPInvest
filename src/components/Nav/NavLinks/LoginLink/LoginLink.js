import React from "react";
import { NavLink } from "react-router-dom";

const LoginLink = (props) => {
  return (
    <NavLink className={`BaseLinks LoginLink ${props.className}`} to="/login">
      <p>{props.title}</p>
    </NavLink>
  );
};

export default LoginLink;
