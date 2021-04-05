import firebase from "firebase";

export const getAuthToken = async () => {
  try {
    return await firebase.auth().currentUser.getIdToken(false);
  } catch (err) {
    console.log(err);
  }
};

export const getUserEmail = async () => {};

class firebaseAuthFunctions {
  static async getAuthToken() {
    try {
      return await firebase.auth().currentUser.getIdToken(false);
    } catch (err) {
      console.log(err);
    }
  }

  static async getUserEmail() {
    try {
      return await firebase.auth().currentUser.email;
    } catch (err) {
      console.log(err);
    }
  }
}

export default firebaseAuthFunctions;
