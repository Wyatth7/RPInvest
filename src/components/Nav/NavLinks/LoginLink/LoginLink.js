import React from "react";
import { NavLink } from "react-router-dom";

const LoginLink = (props) => {
  return (
    <NavLink
      onClick={props.onClick}
      className={`BaseLinks LoginLink ${props.className}`}
      to={`/${props.link}`}
    >
      <p>{props.title}</p>
    </NavLink>
  );
};

export default LoginLink;
