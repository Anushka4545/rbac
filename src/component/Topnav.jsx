import React from "react";
import { Avatar, Button, Dropdown, Space, Typography } from "antd";
import { MenuFoldOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
const { Text } = Typography;
const items = [
  {
    key: "logout",
    label: "Logout",
  },
  {
    key: "password",
    label: "Change Password",
  },
];
const Topnav = ({ setOpenSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleClick = (e) => {
    if (e.key == "logout") {
      logout();
      navigate("/login");
    } else {
      navigate("/change-password");
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center">
        <Button
          className="lg:hidden"
          type="outlined"
          icon={<MenuFoldOutlined />}
          onClick={() => {
            setOpenSidebar((open) => !open);
          }}
        />
      </div>
      <Space>
        <Text type="secondary">Welcome, {user?.name.split(" ")[0]}</Text>
        <Dropdown
          menu={{
            items,
            onClick: handleClick,
          }}
        >
          <Avatar size={40} icon={<UserOutlined />} />
        </Dropdown>
      </Space>
    </>
  );
};

export default Topnav;
