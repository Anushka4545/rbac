import APIService from "../common/APIService";
import Urls from "../common/Urls";

const RoleRequest = {
  getRoles: function (callback) {
    APIService.get(Urls.roles, callback);
  },
  AddRole: function (param, callback) {
    APIService.post(Urls.roles, param, callback);
  },
  deleteRole: function (id, callback) {
    APIService.delete(Urls.roles + "/" + id, callback);
  },
  AssignPermission: function (param, id, callback) {
    APIService.patch(Urls.roles + "/" + id, param, callback);
  },
};

export default RoleRequest;
