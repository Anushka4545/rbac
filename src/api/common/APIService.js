import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const APIService = {
  get: async function (url, callback) {
    const response = await instance.get(url);
    callback(response);
  },
  post: async function (url, param, callback) {
    const response = await instance.post(url, param, {
      //   headers: {
      //     Authorization: SessionService.get.header(),
      //   },
    });
    callback(response);
  },
  put: async function (url, param, callback) {
    const response = await instance.put(url, param, {
      // headers: {
      //   Authorization: SessionService.get.header(),
      // },
    });
    callback(response);
  },
  patch: async function (url, param, callback) {
    const response = await instance.patch(url, param, {
      // headers: {
      //   Authorization: SessionService.get.header(),
      // },
    });
    callback(response);
  },

  delete: async function (url, callback) {
    const response = await instance.delete(url);
    callback(response);
  },
};

export default APIService;
