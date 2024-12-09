import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import UserRequest from "../api/user_management/UserRequest";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = (values) => {
    console.log(user);
    setLoading(true);
    UserRequest.changePassword(
      {
        email: user.email,
        password: values.previousPassword,
        newPassword: values.currentPassword,
      },
      (res) => {
        if (res.status === 200) {
          message.success("Password changed successfully");
          form.resetFields();
        } else {
          message.error("Previous Password Not Matched");
        }
        setLoading(false);
      }
    );
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Change Password
        </h2>
        <Form
          form={form}
          name="changePassword"
          onFinish={handleSubmit}
          //   initialValues={{ remember: true }}
          layout="vertical"
        >
          {/* Previous Password Input */}
          <Form.Item
            name="previousPassword"
            label="Previous Password"
            rules={[
              {
                required: true,
                message: "Please enter your previous password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-500" />}
              placeholder="Enter your previous password"
            />
          </Form.Item>

          {/* Current Password Input */}
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[
              {
                required: true,
                message: "Please enter your current password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-500" />}
              placeholder="Enter your current password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={["currentPassword"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("currentPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-500" />}
              placeholder="Confirm your new password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
