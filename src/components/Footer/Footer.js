import React from "react";
import BaseLink from "./../Nav/NavLinks/BaseLinks/BaseLinks";

const Footer = (props) => {
  return (
    <footer className="Footer">
      <div className="footer-links">
        <div className="group-links">
          <BaseLink to="/" title="Home" />
          <BaseLink to="/how-it-works" title="How It Works" />
          <BaseLink to="/login" title="Login" />
        </div>
        <div className="group-links">
          <BaseLink to="/about" title="About" />
          <BaseLink to="/contact" title="Contact" />
        </div>
      </div>
      <div className="copyright">
        <p>Royal Port Investments &copy; 2021</p>
      </div>
    </footer>
  );
};

export default Footer;
