import axios from "axios";

class Ajax {
  static apiDashboardPath = "/api/v1/dashboard";
  static authPath = "/api/v1/users";

  static async callServer(path, method, data = null) {
    return await axios({
      method,
      url: path,
      data,
    });
  }

  // static async createCommodityItem(data) {
  //   return await this.callServer(
  //     `${this.apiDashboardPath}/`,
  //     "post",
  //     data
  //   );
  // }

  // static async getDashboardData(path) {
  //   return await this.callServer(`${this.apiDashboardPath}/${path}`, "get");
  // }

  // static async getMetalPrices(path) {
  //   return await this.callServer(`${this.apiDashboardPath}/${path}`, "get");
  // }

  static async signup(data) {
    console.log(data);
    return await this.callServer(`${this.authPath}/create`, "post", data);
  }
}

export default Ajax;
