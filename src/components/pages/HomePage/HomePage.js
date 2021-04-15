import React, { useState } from "react";
import LoginLink from "../../Nav/NavLinks/LoginLink/LoginLink";
import SectionElement from "./SectionElements/SectionElement";

// ICONS
import * as solid from "@fortawesome/free-solid-svg-icons";
import Instruction from "./Intruction/Instruction";
import { Helmet } from "react-helmet";
import Ajax from "../../../utils/ajax";

const Homepage = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState(false);
  const [sent, setSent] = useState(false);

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    try {
      await Ajax.sendMessage({ firstName, lastName, email, message });

      e.target.reset();

      if (setErr) {
        setErr(false);
      }
      setSent(true);
    } catch (err) {
      setSent(false);
      setErr(true);
    }
  };

  return (
    <div className="HomePage">
      <Helmet>
        <title>Home | Royal Port Metals</title>
      </Helmet>
      <div className="home-intro">
        <div className="main-home-copy">
          <h1>Royal Port Metals</h1>
          <h2>Keep track of your commodity investments.</h2>
        </div>
        <LoginLink className="get-started" title="Get Started" link="login" />
      </div>
      <SectionElement
        bkStyle={{ backgroundColor: "#222831" }}
        header="How It Works"
        hashPath="how-it-works"
      >
        <div className="how-it-works-items">
          <Instruction
            icon={solid.faMoneyCheck}
            step="Buy your commodity of choice."
          />
          <Instruction
            icon={solid.faStore}
            step="Add your commodity to your profile."
          />
          <Instruction
            icon={solid.faChartLine}
            step="Watch as your commodity changes over time."
          />
        </div>
      </SectionElement>
      <SectionElement
        bkStyle={{ backgroundColor: "#30475e" }}
        header="About RPInvest"
        hashPath="about"
      >
        <p className="about-text">
          Created by an investor, web developer, and full-time college student
          with a desire to scrap cumbersome spread sheets, Jud, in the middle of
          an extrodinarily busy time in his life, chose to embark on a mission
          to not only solve his need of a simple, easy to use application, but
          to most importantly bring together a large community of like minded
          investors in search of a simplistic way to guard their investments and
          future wealth.
        </p>
      </SectionElement>
      <SectionElement
        bkStyle={{ backgroundColor: "#222831" }}
        header="Contact Us"
        hashPath="contact"
      >
        <form onSubmit={sendMessageHandler}>
          <div className="err-sent">
            {err ? (
              <p className="error message-alert">Could not send message.</p>
            ) : null}

            {sent ? <p className="sent message-alert">Message sent!</p> : null}
          </div>
          <div className="name-inputs">
            <input
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              type="text"
              name="firstName"
              required
            />
            <input
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              type="text"
              name="lastName"
              required
            />
          </div>
          <div className="email-input">
            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              name="email"
              required
            />
          </div>
          <div className="message-input">
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message"
              name="userMessage"
              required
            />
          </div>
          <div className="form-btn">
            <button>Send Message</button>
          </div>
        </form>
      </SectionElement>
    </div>
  );
};

export default Homepage;
