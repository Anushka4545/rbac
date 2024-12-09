import APIService from "../common/APIService";
import Urls from "../common/Urls";

const ModuleRequest = {
  getModule: function (callback) {
    APIService.get(Urls.module, callback);
  },
};

export default ModuleRequest;
