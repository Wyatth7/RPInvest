import React from "react";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";

const Modal = (props) => {
  return (
    <div className="Modal">
      <div onClick={props.close} className="backdrop"></div>
      <div className="Modal__content fade-in">
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
