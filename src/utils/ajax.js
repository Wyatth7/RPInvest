import axios from "axios";
import firebaseAuthFunctions from "./getAuthToken";

class Ajax {
  static apiDashboardPath = "/api/v1/dashboard";
  static authPath = "/api/v1/users";

  static async getUserData() {
    try {
      const token = await firebaseAuthFunctions.getAuthToken();
      const email = await firebaseAuthFunctions.getUserEmail();

      return [email, token];
    } catch (err) {
      console.log(err);
    }
  }

  static async callServer(
    path,
    method,
    data = null,
    token = null,
    email = null
  ) {
    try {
      return await axios({
        method,
        url: path,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
          email: email,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Send request to server causing the creation of a commodity item.
   * @param {Object} data Package to send to server
   * @returns Object
   */
  static async createCommodityItem(data) {
    try {
      const [email, token] = await this.getUserData();

      console.log(email, token);

      const newData = {
        ...data,
        email: email,
      };

      const call = await this.callServer(
        `${this.authPath}/addCommodity`,
        "patch",
        newData,
        token
      );

      console.log("call", call);

      return call;
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteCommodityTab() {
    try {
      const [email, token] = await this.getUserData();

      return await this.callServer(
        `${this.authPath}/deleteCommodity`,
        "patch",
        null,
        token,
        email
      );
    } catch (err) {
      console.log(err);
    }
  }

  static async editCommodityTab(data) {
    try {
      const [email, token] = await this.getUserData();

      return await this.callServer(
        `${this.authPath}/editCommodity`,
        "patch",
        data,
        token,
        email
      );
    } catch (err) {
      console.log(err);
    }
  }

  static async getDashboardData() {
    try {
      const [email, token] = await this.getUserData();

      return await this.callServer(
        `${this.authPath}/dashboardData`,
        "get",
        null,
        token,
        email
      );
    } catch (err) {
      console.log(err);
    }
  }

  // static async getMetalPrices(path) {
  //   return await this.callServer(`${this.apiDashboardPath}/${path}`, "get");
  // }

  /**
   * Sends req to server to sign a user up
   * @param {Object} data Data used to create a user
   * @returns string
   */
  static async signup(data) {
    console.log(data);
    return await this.callServer(`${this.authPath}/create`, "post", data);
  }
}

export default Ajax;
