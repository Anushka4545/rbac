import APIService from "../common/APIService";
import Urls from "../common/Urls";

const PermissionRequest = {
  getPermission: function (callback) {
    APIService.get(Urls.permission, callback);
  },
  addPermission: function (param, callback) {
    APIService.post(Urls.permission, param, callback);
  },
  updatePermission: function (param, id, callback) {
    APIService.put(Urls.permission + "/" + id, param, callback);
  },
  deletePermission: function (id, callback) {
    APIService.delete(Urls.permission + "/" + id, callback);
  },
};

export default PermissionRequest;
