import axios from "axios";

class Ajax {
  static apiDashboardPath = "/api/v1/dashboard";
  static authPath = "/api/v1/users";

  static async getUserData() {
    try {
      const token = localStorage.getItem("authTokenRPM");
      const email = localStorage.getItem("userEmailRPM");

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

      const newData = {
        ...data,
        email,
      };

      const call = await this.callServer(
        `${this.authPath}/addCommodity`,
        "patch",
        newData,
        token
      );

      return call;
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteCommodityTab(data) {
    try {
      const [email, token] = await this.getUserData();

      return await this.callServer(
        `${this.authPath}/deleteCommodity`,
        "patch",
        data,
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

  static async getMetalPrices() {
    return await this.callServer(`${this.authPath}/priceData`, "get");
  }

  static async searchString(string) {
    const [email, token] = await this.getUserData();

    return await this.callServer(
      `${this.authPath}/queryCommodities/${string}`,
      "get",
      null,
      token,
      email
    );
  }

  static async sendMessage(data) {
    await this.callServer("/api/v1/contact/message", "post", data);
  }

  /**
   * Sends req to server to sign a user up
   * @param {Object} data Data used to create a user
   * @returns string
   */
  static async signup(data) {
    return await this.callServer(`${this.authPath}/create`, "post", data);
  }
}

export default Ajax;
