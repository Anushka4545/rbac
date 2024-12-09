import { Typography, Table } from "antd";
import React, { useEffect, useState } from "react";
import ModuleRequest from "../../api/user_management/ModuleRequest";
const { Text, Title } = Typography;

const Modules = () => {
  const [modules, setModules] = useState([]);
  const columns = [
    {
      title: "Module Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Module Name",
      dataIndex: "name",
      key: "name",
    },
  ];
  useEffect(() => {
    ModuleRequest.getModule((res) => {
      if (res.status == 200) {
        setModules(res.data);
      }
    });
  }, []);
  return (
    <div>
      <div>
        <Title level={4} style={{ margin: 0 }}>
          Modules
        </Title>
        <Text type="secondary">View all available modules here</Text>
      </div>
      <div
        className="mt-4"
        style={{ overflowX: "auto", maxWidth: "calc(100vw - 24px)" }}
      >
        <Table
          columns={columns}
          dataSource={modules.map((module) => ({
            ...module,
            key: module.id,
          }))}
          bordered
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default Modules;
