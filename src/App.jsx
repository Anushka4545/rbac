import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard";
import Layout from "./Layout";
import NotFound from "./pages/NotFound";
import Permissions from "./pages/User/Permissions";
import Modules from "./pages/User/Modules";
import Roles from "./pages/User/Roles";
import Users from "./pages/User/Users";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import ModuleOneAllAccess from "./pages/ModuleOne/ModuleOneAllAccess.jsx";
import ModuleOneCreateAccess from "./pages/ModuleOne/ModuleOneCreateAccess.jsx";
import ModuleOneReadAccess from "./pages/ModuleOne/ModuleOneReadAccess.jsx";
import ModuleOneUpdateAccess from "./pages/ModuleOne/ModuleOneUpdateAccess.jsx";
import ModuleOneDeleteAccess from "./pages/ModuleOne/ModuleOneDeleteAccess.jsx";
import ModuleTwoAllAccess from "./pages/ModuleTwo/ModuleTwoAllAccess.jsx";
import ModuleTwoCreateAccess from "./pages/ModuleTwo/ModuleTwoCreateAccess.jsx";
import ModuleTwoUpdateAccess from "./pages/ModuleTwo/ModuleTwoUpdateAccess.jsx";
import ModuleTwoDeleteAccess from "./pages/ModuleTwo/ModuleTwoDeleteAccess.jsx";
function App() {
  const routes = [
    {
      path: "/users",
      element: <Users />,
      moduleId: 1,
    },
    {
      path: "/user/permission",
      element: <Permissions />,
      moduleId: 1,
    },
    {
      path: "/user/module",
      element: <Modules />,
      moduleId: 1,
    },
    {
      path: "/change-password",
      element: <ChangePassword />,
      moduleId: 1,
    },
    {
      path: "/user/role",
      element: <Roles />,
      moduleId: 1,
    },
    {
      path: "/module1/all",
      element: <ModuleOneAllAccess />,
      moduleId: 2,
    },
    {
      path: "/module1/create",
      element: <ModuleOneCreateAccess />,
      moduleId: 2,
      rwd: "create",
    },
    {
      path: "/module1/read",
      element: <ModuleOneReadAccess />,
      moduleId: 2,
      rwd: "read",
    },
    {
      path: "/module1/update",
      element: <ModuleOneUpdateAccess />,
      moduleId: 2,
      rwd: "update",
    },
    {
      path: "/module1/delete",
      element: <ModuleOneDeleteAccess />,
      moduleId: 2,
      rwd: "delete",
    },
    {
      path: "/module2/all",
      element: <ModuleTwoAllAccess />,
      moduleId: 3,
      rwd: "delete",
    },
    {
      path: "/module2/create",
      element: <ModuleTwoCreateAccess />,
      moduleId: 3,
      rwd: "create",
    },
    {
      path: "/module2/read",
      element: <ModuleOneReadAccess />,
      moduleId: 3,
      rwd: "read",
    },
    {
      path: "/module2/update",
      element: <ModuleTwoUpdateAccess />,
      moduleId: 3,
      rwd: "update",
    },
    {
      path: "/module2/delete",
      element: <ModuleTwoDeleteAccess />,
      moduleId: 3,
      rwd: "delete",
    },
  ];

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <AuthenticatedRoute>
                  <Dashboard />
                </AuthenticatedRoute>
              }
            />
            <Route path="/unauthorized" element={<Unauthorized />} />
            {routes.map((route) => {
              return (
                <Route
                  path={route.path}
                  key={route.path}
                  element={
                    <ProtectedRoute
                      moduleId={route.moduleId}
                      requiredRWD={route.rwd}
                    >
                      {route.element}
                    </ProtectedRoute>
                  }
                />
              );
            })}
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
