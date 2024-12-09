import { message } from "antd";
import APIService from "../common/APIService";
import Urls from "../common/Urls";
import PermissionRequest from "./PermissionRequest";
import RoleRequest from "./RoleRequest";

const UserRequest = {
  getUser: function (callback) {
    APIService.get(Urls.user, callback);
  },
  addUser: function (param, callback) {
    APIService.get(
      `${Urls.user}?email=${param.email}`, (res) => {
        //checking if user email exists
        if (res.data[0]) {
          callback({ status: 400, message: "Email id already Exist" })
        } else {
          APIService.post(Urls.user, param, callback);
        }


      })

  },
  deleteUser: function (id, callback) {
    APIService.delete(Urls.user + "/" + id, callback);
  },
  assignRoles: function (param, id, callback) {
    APIService.patch(Urls.user + "/" + id, param, callback);
  },
  updateUser: function (param, id, callback) {
    APIService.patch(Urls.user + "/" + id, param, callback);
  },
  toogleUser: function (param, id, callback) {
    APIService.patch(Urls.user + "/" + id, param, callback);
  },
  changePassword: function (param, callback) {
    APIService.get(
      `${Urls.user}?email=${param.email}&password=${param.password}`, (res) => {
        const user = res.data[0];
        if (user) {
          APIService.patch(Urls.user + "/" + user.id, { password: param.newPassword }, callback);
        } else {
          callback({ status: 400 })
        }

      })
  },
  login: function ({ email, password }, callback) {
    APIService.get(
      `${Urls.user}?email=${email}&password=${password}`,
      (res) => {
        //checking if user exists
        if (res.status && res.data[0]) {
          var user = res.data[0];
          // checking if user status is active
          if (user.status == "active") {
            //checking if user is admin
            if (!user.isAdmin) {
              //getting roles 
              RoleRequest.getRoles((res1) => {
                if (res1.status == 200) {
                  //filtering user roles
                  var roles = res1.data.filter((role) =>
                    user.roleIds.includes(role.id)
                  );

                  //filtering unique permission ids from role
                  var permissionsIds = Array.from(
                    new Set(roles.flatMap((role) => role.permissionIds || []))
                  );

                  //getting permission of user
                  PermissionRequest.getPermission((res2) => {
                    if (res2.status == 200) {
                      var permission = res2.data.filter((permission) =>
                        permissionsIds.includes(permission.id)
                      );
                      user.permission = permission;
                      var loggedUser = {
                        username: user.username,
                        email: user.email,
                        name: user.name,
                        isAdmin: user.isAdmin,
                        permissions: permission,
                      };
                      callback({ status: 200, user: loggedUser });
                    }
                  });
                }
              });
            } else {
              var loggedUser = {
                username: user.username,
                email: user.email,
                name: user.name,
                isAdmin: user.isAdmin
              };
              callback({ status: 200, user: loggedUser });
            }

          } else {
            callback({ status: 400, message: "User account is deactivated" })
          }

        } else {
          callback({ status: 400, message: "Wrong Credentials" })
        }
      }
    );
  },
};

export default UserRequest;
