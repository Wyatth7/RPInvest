import React from "react";
import { useState } from "react";
import Auth from "../Auth";
import firebase from "firebase";

const ResetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const onResetHandler = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().sendPasswordResetEmail(email);
      setEmailSent(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="ResetPassword">
      {!emailSent ? (
        <Auth
          path="Login"
          header="Password Reset"
          secondaryHeader="Reset your password below."
          authLink="login"
          authLinkText="Need to login?"
        >
          <form onSubmit={onResetHandler}>
            <input
              placeholder="Email"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <button>Reset Password</button>
            </div>
          </form>
        </Auth>
      ) : (
        <Auth
          path="Login"
          header="Email Sent!"
          secondaryHeader="Password reset email sent."
          authLinkText="Need to login?"
          authLink="login"
        ></Auth>
      )}
    </div>
  );
};

export default ResetPassword;
