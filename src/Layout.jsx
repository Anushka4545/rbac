import React, { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "./component/Sidebar";
import Topnav from "./component/Topnav";
import { Button, Drawer } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import "./Layout.css";
const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const onClose = () => {
    setIsSidebarOpen(false);
  };
  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <div className="max-w-[280px] border-r-2 hidden lg:block h-screen">
          <Sidebar />
        </div>
        <div className="flex-auto">
          {/* Topnav followed by Outlet */}
          <div className="flex justify-between p-3 shadow-md mb-3">
            <Topnav setOpenSidebar={setIsSidebarOpen} />
          </div>
          <div className="px-3">
            <Outlet />
          </div>
        </div>
      </div>
      <Drawer
        title="RBAC UI"
        placement="left"
        closable={false}
        size="default"
        onClose={onClose}
        open={isSidebarOpen}
        key="left"
        keyboard={true}
        className="lg:hidden"
        extra={
          <Button type="outlined" onClick={onClose}>
            <CloseCircleOutlined />
          </Button>
        }
      >
        <Sidebar setOpenSidebar={setIsSidebarOpen} drawer={true} />
      </Drawer>
    </>
  );
};

export default Layout;
