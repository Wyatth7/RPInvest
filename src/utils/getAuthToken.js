import firebase from "firebase/app";

export const getAuthToken = async () => {
  try {
    return await firebase.auth().currentUser.getIdToken(false);
  } catch (err) {
    console.log(err);
  }
};

export const getUserEmail = async () => {};

export class FirebaseAuthFunctions {
  static async getAuthToken() {
    try {
      return await firebase.auth().currentUser.getIdToken(false);
    } catch (err) {
      console.log(err);
    }
  }

  static async getUserEmail() {
    try {
      return await (
        await firebase
          .auth()
          .signInWithCustomToken(localStorage.getItem("authToken"))
      ).user.email;
    } catch (err) {
      console.log(err);
    }
  }
}

export default FirebaseAuthFunctions;
