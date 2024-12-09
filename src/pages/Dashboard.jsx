import React from "react";
import { Typography } from "antd";
import { useAuth } from "../context/AuthContext";
const { Title } = Typography;
const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="flex justify-between flex-wrap">
        <div>
          <Title level={4} style={{ margin: 0 }}>
            Dashboard
          </Title>
        </div>
      </div>
      <div className="flex items-center justify-center">
        Welcome, {user?.name}
      </div>
    </div>
  );
};

export default Dashboard;
