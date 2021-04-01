import firebase from "firebase";

const getAuthToken = async () => {
  try {
    return await firebase.auth().currentUser.getIdToken(false);
  } catch (err) {
    console.log(err);
  }
};

export default getAuthToken;
