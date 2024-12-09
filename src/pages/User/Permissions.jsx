import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  Typography,
  message,
  Modal,
  Table,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
const { Text, Title } = Typography;
import PermissionRequest from "../../api/user_management/PermissionRequest";
import ModuleRequest from "../../api/user_management/ModuleRequest";
import { useAuth } from "../../context/AuthContext";

const CreatePermission = ({
  open,
  handleClose,
  modules,
  setRefresh,
  editPermission,
}) => {
  const [form] = Form.useForm();
  const handleRwdChange = (checkedValues) => {
    if (
      (checkedValues.includes("create") ||
        checkedValues.includes("delete") ||
        checkedValues.includes("update")) &&
      !checkedValues.includes("read")
    ) {
      form.setFieldsValue({
        rwd: [...checkedValues, "read"],
      });
    }
  };

  const addPermission = (values) => {
    PermissionRequest.addPermission(values, (res) => {
      console.log(res);
      if (res.status == 201) {
        setRefresh((v) => !v);
        message.success("Permission created successfully");
        handleClose();
      } else {
        message.error("Failed to create permission");
      }
    });
  };
  const updatePermission = (values) => {
    PermissionRequest.updatePermission(values, editPermission?.id, (res) => {
      console.log(res);
      if (res.status == 200) {
        setRefresh((v) => !v);
        message.success("Permission updated successfully");
        handleClose();
      } else {
        message.error("Failed to update permission");
      }
    });
  };

  const handleSubmit = (values) => {
    if (editPermission) {
      updatePermission(values);
    } else {
      addPermission(values);
    }
  };

  useEffect(() => {
    if (editPermission) {
      form.setFieldsValue(editPermission);
    } else {
      form.setFieldsValue({
        permissionName: "",
        rwd: [],
        moduleId: null,
      });
    }
  }, [editPermission]);

  return (
    <Modal
      title="Create Permission"
      open={open}
      onCancel={handleClose}
      footer={[]}
    >
      <p>Add new Permission here </p>
      <div className="py-5">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ rwd: [] }}
        >
          <Form.Item
            name="moduleId"
            label="Module"
            rules={[{ required: true, message: "Please select a module!" }]}
          >
            <Select placeholder="Select a module">
              {modules.map((module) => (
                <Select.Option key={module.id} value={module.id}>
                  {module.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="permissionName"
            label="Permission Name"
            rules={[
              { required: true, message: "Please enter the permission name!" },
            ]}
          >
            <Input placeholder="Enter permission name" />
          </Form.Item>

          <Form.Item
            name="rwd"
            label="Permissions"
            rules={[
              {
                required: true,
                message: "Please select at least one permission!",
              },
            ]}
          >
            <Checkbox.Group onChange={handleRwdChange}>
              <Checkbox value="create">Create</Checkbox>
              <Checkbox value="read">Read</Checkbox>
              <Checkbox value="update">Update</Checkbox>
              <Checkbox value="delete">Delete</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {!editPermission ? "Add Permission" : "Update Permission"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

const Permissions = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [modules, setModules] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [editPermission, setEditPermission] = useState();
  const { hasPermission } = useAuth();

  useEffect(() => {
    ModuleRequest.getModule((res) => {
      if (res.status == 200) {
        setModules(res.data);
      }
    });
  }, []);
  useEffect(() => {
    PermissionRequest.getPermission((res) => {
      if (res.status == 200) {
        setPermissions(res.data);
      }
    });
  }, [refresh]);
  const handleCreateModalClose = () => {
    setEditPermission(null);
    setOpenCreateModal(false);
  };

  const getModuleName = (moduleId) => {
    const module = modules.find((mod) => mod.id === moduleId);
    return module ? module.name : "Unknown Module";
  };

  const columns = [
    {
      title: "Permission Name",
      dataIndex: "permissionName",
      key: "permissionName",
    },
    {
      title: "Module",
      dataIndex: "moduleId",
      key: "moduleId",
      render: (moduleId) => getModuleName(moduleId),
    },
    {
      title: "Create",
      dataIndex: "rwd",
      key: "create",
      render: (rwd) => <Checkbox checked={rwd.includes("create")} disabled />,
    },
    {
      title: "Read",
      dataIndex: "rwd",
      key: "read",
      render: (rwd) => <Checkbox checked={rwd.includes("read")} disabled />,
    },
    {
      title: "Update",
      dataIndex: "rwd",
      key: "update",
      render: (rwd) => <Checkbox checked={rwd.includes("update")} disabled />,
    },
    {
      title: "Delete",
      dataIndex: "rwd",
      key: "delete",
      render: (rwd) => <Checkbox checked={rwd.includes("delete")} disabled />,
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
              PermissionRequest.deletePermission(id, (res) => {
                if (res.status == 200) {
                  message.success("Permission deleted successfully");
                  setRefresh((v) => !v);
                } else {
                  message.error("Error deleting permission");
                }
              });
            }}
          >
            Delete
          </Button>
          <Button
            color="primary"
            variant="outlined"
            style={{ display: hasPermission(1, "update") ? "" : "none" }}
            onClick={() => {
              setEditPermission(row);
              setOpenCreateModal(true);
            }}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-between flex-wrap">
        <div>
          <Title level={4} style={{ margin: 0 }}>
            Permission
          </Title>
          <Text type="secondary">Add or View permissions here</Text>
        </div>
        <div>
          <Button
            color="primary"
            variant="outlined"
            style={{ display: hasPermission(1, "create") ? "" : "none" }}
            onClick={() => {
              setOpenCreateModal(true);
            }}
          >
            + Add Permission
          </Button>
        </div>
      </div>
      <div
        className="mt-4"
        style={{ overflowX: "auto", maxWidth: "calc(100vw - 24px)" }}
      >
        <Table
          columns={columns}
          dataSource={permissions.map((permission) => ({
            ...permission,
            key: permission.id,
          }))}
          bordered
          pagination={{ pageSize: 10 }}
        />
      </div>
      <CreatePermission
        open={openCreateModal}
        modules={modules}
        editPermission={editPermission}
        handleClose={handleCreateModalClose}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default Permissions;
