import React from "react";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Instruction = (props) => {
  return (
    <div className="Instruction">
      <div className="instruction-img">
        <div>
          <FontAwesomeIcon icon={props.icon} />
        </div>
      </div>
      <div className="text-content">
        <h3>{props.step}</h3>
      </div>
    </div>
  );
};

export default Instruction;
