import React from "react";
import { useAuth } from "../../context/AuthContext";

const ModuleOneAllAccess = () => {
  const moduleId = 2;
  const { hasPermission } = useAuth();
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Access</h2>
      {hasPermission(moduleId, "create") && (
        <p className="text-gray-600">
          You are seeing this because you have access to{" "}
          <strong>Module One</strong> Create action.
        </p>
      )}
      {hasPermission(moduleId, "read") && (
        <p className="text-gray-600">
          You are seeing this because you have access to{" "}
          <strong>Module One</strong> Read action.
        </p>
      )}
      {hasPermission(moduleId, "update") && (
        <p className="text-gray-600">
          You are seeing this because you have access to{" "}
          <strong>Module One</strong> Update action.
        </p>
      )}
      {hasPermission(moduleId, "delete") && (
        <p className="text-gray-600">
          You are seeing this because you have access to{" "}
          <strong>Module One</strong> Delete action.
        </p>
      )}
    </div>
  );
};

export default ModuleOneAllAccess;
