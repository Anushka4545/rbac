import React, { useEffect } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles
import UserRequest from "../api/user_management/UserRequest";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import SessionService from "../storage/SessionService";


const { Title, Text } = Typography;

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) return navigate("/");
  }, []);

  const handleLogin = (values) => {
    UserRequest.login(values, (res) => {
      console.log(res);
      if (res.status == 200) {
        SessionService.setUser(res.user)
        // localStorage.setItem("user", JSON.stringify(res.user));
        login(res.user);
        navigate("/");
      } else {
        message.error(res.message);
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <Title level={3} className="text-center mb-4">
          Sign In
        </Title>
        <Text type="secondary" className="block text-center mb-4">
          Welcome back! Please sign in to continue.
        </Text>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleLogin}
          initialValues={{
            email: "",
            password: "",
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
