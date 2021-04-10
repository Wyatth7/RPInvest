import React, { useEffect } from "react";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";

const Modal = (props) => {
  useEffect(() => {
    document.querySelector("body").style.overflow = "hidden";

    return () => (document.querySelector("body").style.overflow = "visible");
  });

  return (
    <div className="Modal">
      <div onClick={props.close} className={props.nav ? "" : "backdrop"}></div>
      <div
        className={`${
          props.nav ? "Modal__nav-content" : "Modal__content"
        } fade-in`}
      >
        <FontAwesomeIcon
          onClick={props.close}
          className="close-icon"
          icon={solid.faTimes}
        />
        <div className="dynamic-content">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
