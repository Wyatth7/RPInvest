import React from "react";
import HashLinks from "../Nav/NavLinks/HashLinks/HashLinks";
import BaseLink from "./../Nav/NavLinks/BaseLinks/BaseLinks";

const Footer = (props) => {
  return (
    <footer className="Footer">
      <div className="footer-links">
        <div className="group-links">
          <HashLinks to="/#home" title="Home" />
          <HashLinks to="/#how-it-works" title="How It Works" />
          {props.auth ? null : <BaseLink to="/login" title="Login" />}
        </div>
        <div className="group-links">
          <HashLinks to="/#about" title="About" />
          <HashLinks to="/#contact" title="Contact" />
        </div>
      </div>
      <div className="copyright">
        <p>Royal Port Investments &copy; 2021</p>
      </div>
    </footer>
  );
};

export default Footer;
