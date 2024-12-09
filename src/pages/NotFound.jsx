import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      }
    />
  );
};

export default NotFound;
