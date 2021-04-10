import React from "react";
import { NavHashLink } from "react-router-hash-link";

const HashLinks = (props) => {
  return (
    <NavHashLink
      onClick={props.onClick}
      smooth
      className={`BaseLinks ${props.className}`}
      scroll={(el) =>
        el.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      to={props.to}
    >
      <p>{props.title}</p>
    </NavHashLink>
  );
};

export default HashLinks;
