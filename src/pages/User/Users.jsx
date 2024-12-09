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
import UserRequest from "../../api/user_management/UserRequest";
import RoleRequest from "../../api/user_management/RoleRequest";
import { useAuth } from "../../context/AuthContext";
const { Search } = Input;
const CreateUser = ({ open, handleClose, setRefresh, roles }) => {
  const [form] = Form.useForm();
  const [isAdmin, setIsAdmin] = useState();
  const { user } = useAuth();

  const handleSubmit = (values) => {
    console.log(values);
    values.status = "active";
    UserRequest.addUser(values, (res) => {
      console.log(res);
      if (res.status == 201) {
        setRefresh((v) => !v);
        message.success("User created successfully");
        handleClose();
      } else {
        message.error(res.message);
      }
    });
  };

  return (
    <Modal title="Create User" open={open} onCancel={handleClose} footer={[]}>
      <p>Add new user here </p>
      <div className="py-5">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter the username!" }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the name!" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter the email!" },
              { type: "email", message: "Please enter the valid email!" },
            ]}
          >
            <Input placeholder="Enter user email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter the password!" }]}
          >
            <Input.Password placeholder="Enter user password" />
          </Form.Item>

          {user.isAdmin && (
            <Form.Item name="isAdmin" label="Admin" valuePropName="checked">
              <Checkbox
                onChange={(e) => {
                  setIsAdmin(e.target.checked);
                  form.setFieldsValue({ isAdmin: e.target.checked ? 1 : 0 });
                }}
              >
                Is Admin
              </Checkbox>
            </Form.Item>
          )}

          {!isAdmin && (
            <Form.Item
              name="roleIds"
              label="Roles"
              rules={[
                { required: true, message: "Please select atleast one roles!" },
              ]}
            >
              <Checkbox.Group>
                {roles.map((r) => {
                  return (
                    <Checkbox key={r.id} value={r.id}>
                      {r.name}
                    </Checkbox>
                  );
                })}
              </Checkbox.Group>
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add User
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
const EditUser = ({ open, handleClose, user, setRefresh }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    UserRequest.updateUser(values, user.id, (res) => {
      console.log(res);
      if (res.status == 200) {
        setRefresh((v) => !v);
        message.success("User updated successfully");
        handleClose();
      } else {
        message.error("Failed to update user");
      }
    });
  };

  useEffect(() => {
    form.setFieldsValue(user);
  }, [user]);
  return (
    <Modal title="Edit User" open={open} onCancel={handleClose} footer={[]}>
      <div className="py-5">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter the username!" }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the name!" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter the email!" },
              { type: "email", message: "Please enter the valid email!" },
            ]}
          >
            <Input placeholder="Enter user email" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update User
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

const AssignRole = ({ open, handleClose, user, setRefresh, roles }) => {
  const [form] = Form.useForm();
  const [assignedRole, setRoles] = useState([]);
  const handleRolesChange = (checkedValues) => {
    setRoles(checkedValues);
  };
  useEffect(() => {
    form.setFieldsValue({
      roleIds: user?.roleIds,
    });
  }, [user]);

  const handleSubmit = (values) => {
    UserRequest.assignRoles(values, user.id, (res) => {
      console.log(res);
      if (res.status == 200) {
        setRefresh((v) => !v);
        message.success("Role assigned successfully");
        handleClose();
      } else {
        message.error("Failed to assign role");
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
            name="roleIds"
            label="Roles"
            rules={[
              {
                required: true,
                message: "Please select at least one role!",
              },
            ]}
          >
            <Checkbox.Group onChange={handleRolesChange}>
              {roles.map((r) => {
                return (
                  <Checkbox key={r.id} value={r.id}>
                    {r.name}
                  </Checkbox>
                );
              })}
            </Checkbox.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Assign Role
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [roles, setRoles] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const { hasPermission, user } = useAuth();

  const handleCreateModalClose = () => {
    setOpenCreateModal(false);
  };
  const handleAssignModalClose = () => {
    setSelectedUser(null);
    setOpenAssignModal(false);
  };
  const handleEditModalClose = () => {
    setSelectedUser(null);
    setOpenEditModal(false);
  };

  const handleAssignClick = (user) => {
    setSelectedUser(user);
    setOpenAssignModal(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  useEffect(() => {
    UserRequest.getUser((res) => {
      if (res.status == 200) {
        setUsers(res.data);
      }
    });
  }, [refresh]);
  useEffect(() => {
    RoleRequest.getRoles((res) => {
      if (res.status == 200) {
        setRoles(res.data);
      }
    });
  }, []);

  const getRolesName = (roleIds, row) => {
    if (roleIds) {
      const data = [];
      roleIds?.map((roleId) => {
        const role = roles.find((r) => r.id === roleId);
        data.push(
          <Tag className="m-1">{role ? role.name : "Unknown Role"}</Tag>
        );
      });

      return data;
    } else if (row.isAdmin) {
      return <Tag className="m-1">Administrator</Tag>;
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Roles",
      dataIndex: "roleIds",
      key: "roleIds",
      render: (roleIds, row) => getRolesName(roleIds, row),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id, row) => (
        <Space>
          {row.isAdmin ? (
            user.isAdmin ? (
              <>
                <Button
                  color="danger"
                  variant="outlined"
                  style={{
                    display: hasPermission(1, "delete") ? "" : "none",
                  }}
                  onClick={() => {
                    UserRequest.deleteUser(id, (res) => {
                      if (res.status == 200) {
                        message.success("User deleted Successfully");
                        setRefresh((v) => !v);
                      } else {
                        message.error("User deletion failed");
                      }
                    });
                  }}
                >
                  Delete
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  style={{ display: hasPermission(1, "update") ? "" : "none" }}
                  onClick={() => {
                    UserRequest.toogleUser(
                      {
                        status: row.status == "active" ? "deactive" : "active",
                      },
                      row.id,
                      (res) => {
                        if (res.status == 200) {
                          setRefresh((v) => !v);
                          message.success(
                            `User ${
                              row.status == "active"
                                ? "Deactivated"
                                : "Activated"
                            } Successfully`
                          );
                        }
                      }
                    );
                  }}
                >
                  {row.status == "active" ? "Deactivate" : "Activate"}
                </Button>

                <Button
                  color="primary"
                  variant="outlined"
                  style={{ display: hasPermission(1, "update") ? "" : "none" }}
                  onClick={() => handleEditClick(row)}
                >
                  Edit User
                </Button>
              </>
            ) : (
              ""
            )
          ) : (
            <>
              <Button
                color="danger"
                variant="outlined"
                style={{
                  display:
                    !row.isAdmin && hasPermission(1, "delete") ? "" : "none",
                }}
                onClick={() => {
                  UserRequest.deleteUser(id, (res) => {
                    if (res.status == 200) {
                      message.success("User deleted Successfully");
                      setRefresh((v) => !v);
                    } else {
                      message.error("User deletion failed");
                    }
                  });
                }}
              >
                Delete
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                style={{ display: hasPermission(1, "update") ? "" : "none" }}
                onClick={() => {
                  UserRequest.toogleUser(
                    { status: row.status == "active" ? "deactive" : "active" },
                    row.id,
                    (res) => {
                      if (res.status == 200) {
                        setRefresh((v) => !v);
                        message.success(
                          `User ${
                            row.status == "active" ? "Deactivated" : "Activated"
                          } Successfully`
                        );
                      }
                    }
                  );
                }}
              >
                {row.status == "active" ? "Deactivate" : "Activate"}
              </Button>

              <Button
                color="primary"
                variant="outlined"
                style={{ display: hasPermission(1, "update") ? "" : "none" }}
                onClick={() => handleEditClick(row)}
              >
                Edit User
              </Button>
            </>
          )}

          <Button
            color="primary"
            variant="outlined"
            style={{
              display:
                !row.isAdmin &&
                row.email != user.email &&
                hasPermission(1, "update")
                  ? ""
                  : "none",
            }}
            onClick={() => handleAssignClick(row)}
          >
            Assign Roles
          </Button>
        </Space>
      ),
    },
  ];
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <div className="flex justify-between flex-wrap">
        <div>
          <Title level={4} style={{ margin: 0 }}>
            Users
          </Title>
          <Text type="secondary">Add or View users here</Text>
        </div>
        <Space>
          <Search
            placeholder="Serch by name, username or email"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            style={{ width: 200 }}
          />
          <Button
            color="primary"
            variant="outlined"
            style={{ display: hasPermission(1, "create") ? "" : "none" }}
            onClick={() => setOpenCreateModal(true)}
          >
            + Add User
          </Button>
        </Space>
      </div>
      <div
        className="mt-4"
        style={{ overflowX: "auto", maxWidth: "calc(100vw - 24px)" }}
      >
        <Table
          columns={columns}
          dataSource={filteredUsers.map((user) => ({
            ...user,
            key: user.id,
          }))}
          bordered
          pagination={{ pageSize: 10 }}
        />
      </div>
      <CreateUser
        open={openCreateModal}
        handleClose={handleCreateModalClose}
        setRefresh={setRefresh}
        roles={roles}
      />
      <AssignRole
        open={openAssignModal}
        handleClose={handleAssignModalClose}
        user={selectedUser}
        setRefresh={setRefresh}
        roles={roles}
      />
      <EditUser
        open={openEditModal}
        handleClose={handleEditModalClose}
        user={selectedUser}
        setRefresh={setRefresh}
        roles={roles}
      />
    </>
  );
};

export default Users;
