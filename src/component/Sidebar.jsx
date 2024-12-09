import { Menu, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
const items = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <HomeOutlined />,
  },
  {
    key: "user_management",
    label: "User Management",
    moduleid: 1,
    children: [
      {
        key: "user_group",
        label: "User",
        type: "group",
        children: [
          {
            key: "users",
            label: "Users List",
            path: "/users",
          },
        ],
      },
      {
        key: "roles_group",
        label: "Roles & Permission",
        type: "group",
        children: [
          {
            key: "roles",
            label: "Roles",
            path: "/user/role",
          },
          {
            key: "permission",
            label: "Permission",
            path: "/user/permission",
          },
          {
            key: "module",
            label: "Modules",
            path: "/user/module",
          },
        ],
      },
    ],
  },
  {
    key: "module1",
    label: "Sample Module 1",
    moduleid: 2,
    children: [
      {
        key: "all_access_1",
        label: "All Access",
        path: "/module1/all",
      },
      {
        key: "create_access_1",
        label: "Create Access",
        path: "/module1/create",
        rwd: "create",
      },
      {
        key: "read_access_1",
        label: "Read Access",
        path: "/module1/read",
        rwd: "read",
      },
      {
        key: "update_access_1",
        label: "Update Access",
        path: "/module1/update",
        rwd: "update",
      },
      {
        key: "delete_access_1",
        label: "Delete Access",
        path: "/module1/delete",
        rwd: "delete",
      },
    ],
  },
  {
    key: "module2",
    label: "Sample Module 2",
    moduleid: 3,
    children: [
      {
        key: "all_access_2",
        label: "Delete Access",
        path: "/module2/all",
      },
      {
        key: "create_access_2",
        label: "Create Access",
        path: "/module2/create",
        rwd: "create",
      },
      {
        key: "read_access_2",
        label: "Read Access",
        path: "/module2/read",
        rwd: "read",
      },
      {
        key: "update_access_2",
        label: "Update Access",
        path: "/module2/update",
        rwd: "update",
      },
      {
        key: "delete_access_2",
        label: "Delete Access",
        path: "/module2/delete",
        rwd: "delete",
      },
    ],
  },
];

const Sidebar = ({ setOpenSidebar, drawer }) => {
  const navigate = useNavigate();
  const { hasPermission } = useAuth();

  //filter out routes based on permission given
  var finalRoute = [];
  //mapping routes one by one
  items.map((nav) => {
    //checking if need to check permission
    if (nav.moduleid) {
      //does user have permission to module
      if (hasPermission(nav.moduleid)) {
        //checking if navigation is dropdown
        if (nav.children.length) {
          var childs = [];

          //mapping childs
          nav.children.map((subroute) => {
            //checking if need to check permission
            if (subroute.rwd) {
              //does route have required rwd permission
              if (hasPermission(nav.moduleid, subroute.rwd)) {
                childs.push(subroute);
              }
            } else {
              childs.push(subroute);
            }

            nav.children = childs;
          });
        }
        finalRoute.push(nav);
      }
    } else {
      finalRoute.push(nav);
    }
  });

  //generate path relative to keys
  function generatePaths(arr, patharr) {
    patharr = {};
    arr.map((nav) => {
      if (nav.children) {
        var np = generatePaths(nav.children, patharr);
        patharr = { ...patharr, ...np };
      } else {
        patharr[nav.key] = nav.path;
      }
    });
    return patharr;
  }

  const routes = generatePaths(finalRoute, []);

  const route = ({ key }) => {
    if (drawer) setOpenSidebar((open) => !open);
    navigate(routes[key]);
  };

  return (
    <div>
      <div
        className="py-2 text-center flex justify-center"
        style={{ display: drawer ? "none" : "" }}
      >
        <Typography className="font-extrabold">RBAC UI</Typography>
      </div>

      <Menu
        onClick={route}
        style={{
          minWidth: 240,
        }}
        defaultSelectedKeys={["dashboard"]}
        mode="inline"
        items={finalRoute}
      />
    </div>
  );
};

export default Sidebar;
