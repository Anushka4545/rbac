import {
  Form,
  Input,
  Button,
  Typography,
  message,
  Modal,
  Table,
  Tag,
  Space,
  Checkbox,
} from "antd";
import React, { useEffect, useState } from "react";
const { Text, Title } = Typography;
import RoleRequest from "../../api/user_management/RoleRequest";
import PermissionRequest from "../../api/user_management/PermissionRequest";
import { useAuth } from "../../context/AuthContext";

const CreateRole = ({ open, handleClose, setRefresh, permissions }) => {
  const [form] = Form.useForm();
  const [assignedPermission, setPermission] = useState([]);
  const handlePermissionChange = (checkedValues) => {
    setPermission(checkedValues);
  };
  const handleSubmit = (values) => {
    RoleRequest.AddRole(values, (res) => {
      if (res.status == 201) {
        message.success("Role crested successfully");
        setRefresh((v) => !v);
        handleClose();
      } else {
        message.error("Failed to create role");
      }
    });
  };
  return (
    <Modal title="Create Role" open={open} onCancel={handleClose} footer={[]}>
      <p>Add new roles here </p>
      <div className="py-5">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ rwd: [] }}
        >
          <Form.Item
            name="name"
            label="Role Name"
            rules={[{ required: true, message: "Please enter the role name!" }]}
          >
            <Input placeholder="Enter role name" />
          </Form.Item>

          <Form.Item
            name="permissionIds"
            label="Permissions"
            rules={[
              {
                required: true,
                message: "Please select at least one permission!",
              },
            ]}
          >
            <Checkbox.Group onChange={handlePermissionChange}>
              {permissions.map((p) => {
                return (
                  <Checkbox key={p.id} value={p.id}>
                    {p.permissionName}
                  </Checkbox>
                );
              })}
            </Checkbox.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Role
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

const AssignPermission = ({
  open,
  handleClose,
  role,
  permissions,
  setRefresh,
}) => {
  const [form] = Form.useForm();
  const [assignedPermission, setPermission] = useState([]);
  const handlePermissionChange = (checkedValues) => {
    setPermission(checkedValues);
  };
  useEffect(() => {
    form.setFieldsValue({
      permissionIds: role?.permissionIds,
    });
  }, [role]);

  const handleSubmit = (values) => {
    RoleRequest.AssignPermission(values, role.id, (res) => {
      if (res.status == 200) {
        setRefresh((v) => !v);
        handleClose();
        message.success("Permission assigned Succesfully");
      } else {
        message.success("Permission Assignment Failed");
      }
    });
  };

  return (
    <Modal
      title="Assign Permission"
      open={open}
      onCancel={handleClose}
      footer={[]}
    >
      <p>Assign Permissions here </p>
      <div className="py-5">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="permissionIds"
            label="Permissions"
            rules={[
              {
                required: true,
                message: "Please select at least one permission!",
              },
            ]}
          >
            <Checkbox.Group onChange={handlePermissionChange}>
              {permissions.map((p) => {
                return (
                  <Checkbox key={p.id} value={p.id}>
                    {p.permissionName}
                  </Checkbox>
                );
              })}
            </Checkbox.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Assign Permission
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

const Roles = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState();
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [refresh, setRefresh] = useState();
  const { hasPermission } = useAuth();

  const handleCreateModalClose = () => {
    setOpenCreateModal(false);
  };
  const handleAssignModalClose = () => {
    setOpenAssignModal(false);
  };

  const handleAssignClick = (id) => {
    setSelectedRole(id);
    setOpenAssignModal(true);
  };

  useEffect(() => {
    RoleRequest.getRoles((res) => {
      if (res.status == 200) {
        setRoles(res.data);
      }
    });
  }, [refresh]);

  useEffect(() => {
    PermissionRequest.getPermission((res) => {
      if (res.status == 200) {
        setPermissions(res.data);
      }
    });
  }, []);

  const getPermissionName = (permissionIds) => {
    const data = [];
    permissionIds.map((permissionId) => {
      const permission = permissions.find((p) => p.id === permissionId);
      data.push(
        <Tag className="m-1">
          {permission ? permission.permissionName : "Unknown Permission"}
        </Tag>
      );
    });

    return data;
  };

  const columns = [
    {
      title: "Role ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Permissions",
      dataIndex: "permissionIds",
      key: "permissionIds",
      render: (pids) => getPermissionName(pids),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "delete_btn",
      render: (id, row) => (
        <Space>
          <Button
            color="danger"
            variant="outlined"
            style={{ display: hasPermission(1, "delete") ? "" : "none" }}
            onClick={() => {
              RoleRequest.deleteRole(id, (res) => {
                if (res.status == 200) {
                  message.success("Role deleted successfully");
                  setRefresh((v) => !v);
                } else {
                  message.error("Error deleting role");
                }
              });
            }}
          >
            {console.log(hasPermission(1, "delete"))}
            Delete
          </Button>
          <Button
            color="primary"
            variant="outlined"
            style={{ display: hasPermission(1, "update") ? "" : "none" }}
            onClick={() => handleAssignClick(row)}
          >
            Assign Permission
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="flex justify-between flex-wrap">
        <div>
          <Title level={4} style={{ margin: 0 }}>
            Roles
          </Title>
          <Text type="secondary">Add or View roles here</Text>
        </div>
        <div>
          <Button
            color="primary"
            variant="outlined"
            style={{ display: hasPermission(1, "create") ? "" : "none" }}
            onClick={() => setOpenCreateModal(true)}
          >
            + Add Roles
          </Button>
        </div>
      </div>
      <div
        className="mt-4"
        style={{ overflowX: "auto", maxWidth: "calc(100vw - 24px)" }}
      >
        <Table
          columns={columns}
          dataSource={roles.map((role) => ({
            ...role,
            key: role.id,
          }))}
          bordered
          pagination={{ pageSize: 10 }}
        />
      </div>
      <CreateRole
        open={openCreateModal}
        handleClose={handleCreateModalClose}
        setRefresh={setRefresh}
        permissions={permissions}
      />
      <AssignPermission
        open={openAssignModal}
        handleClose={handleAssignModalClose}
        role={selectedRole}
        setRefresh={setRefresh}
        permissions={permissions}
      />
    </>
  );
};

export default Roles;
