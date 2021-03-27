import React from "react";

const SectionElement = (props) => {
  return (
    <div className="SectionElement" style={props.bkStyle} id={props.hashPath}>
      <div className="header-content">
        <h1>{props.header}</h1>
        <div></div>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
};

export default SectionElement;
