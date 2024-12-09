## RBAC UI

### Project Description

#### Overview

This project is designed to implement a Role-Based Access Control (RBAC) system with a user management module, as well as two sample modules to demonstrate how the RBAC permissions and roles affect navigation and access to content. The system enables comprehensive user management, including CRUD (Create, Read, Update, Delete) operations for users, roles, and permissions. Additionally, it allows for granular control over who can access specific parts of the application based on assigned roles and permissions.

### Modules

1. **User Management Module**
2. **Sample Module 1**
3. **Sample Module 2**

---

### 1. **User Management Module**

The **User Management** module is the core feature of the system. It enables administrators to manage users, roles, and permissions using a full RBAC approach. This module includes the following key components:

#### a. **Users Management**

- **Create User**: Admins can create new users by specifying their name, email, and other relevant details.
- **Read User**: Admins can view user details.
- **Update User**: Admins can edit user details like name, email, roles, etc.
- **Delete User**: Admins can remove users from the system.

#### b. **Roles Management**

- **Create Role**: Admins can create new roles. Each role can be associated with multiple permissions.
- **Read Role**: Admins can view the details of a role and see which permissions are assigned to it.
- **Update Role**: Admins can modify the roles and reassign permissions.
- **Delete Role**: Admins can delete roles if not in use.

#### c. **Permissions Management**

- **Create Permission**: Permissions are created by selecting a module and specifying at least one CRUD permission (Create, Read, Update, Delete). Each permission is assigned a name and description for clarity.
- **Read Permission**: Admins can see the list of permissions, their associated modules, and CRUD operations.
- **Update Permission**: Admins can modify permissions by changing their assigned module or CRUD operation.
- **Delete Permission**: Admins can delete a permission if it's no longer needed.

#### d. **Role Assignment**

- Users can be assigned one or more roles.
  - If a user is an **admin**, they have access to all resources and permissions in the system.
  - If the user is **not an admin**, their access is restricted to the permissions granted by the roles they are assigned.

#### e. **Permissions Assignment to Roles**

- Admins can assign multiple permissions to a role.
- Permissions control access to specific modules or actions within modules (e.g., reading, updating, or deleting records).

#### f. **Visibility Based on Permissions**

- UI elements such as navigation menus, buttons, and pages are dynamically shown or hidden based on the user's assigned permissions.
- If a user lacks the permission to access a certain module (like **Sample Module 1** or **Sample Module 2**), the corresponding page or section will not be visible in the navigation menu.
- Users will not be able to access pages thats permissions are not given.

#### g. **Change Password**

- There is a feature that allows users to change their password.
  - This page is accessible only to the user who is changing their password and administrators.

---

### 2. **Sample Module 1**

**Sample Module 1** is a placeholder module to test and demonstrate the RBAC implementation. This module can have various functionalities (like viewing records, editing records, etc.) that depend on the user’s permissions.

#### Functionality:

- **Permissions**: Access to **Sample Module 1** depends on the permissions assigned to the user (Read, Write, Admin, etc.).
  - If a user has **Read** permission for **Sample Module 1**, they can view the content.
  - If a user has **Write** permission, they can modify content.
  - If a user lacks permission for **Sample Module 1**, it will be hidden from the navigation menu entirely.

#### Example:

- A user with only **Read** permission on **Sample Module 1** will see placeholder text like “You are seeing this because you have **Read** permission for this module.”

---

### 3. **Sample Module 2**

Similar to **Sample Module 1**, **Sample Module 2** serves as a secondary test module to further demonstrate RBAC functionality. It can include additional features or different types of resources to highlight role-based access.

#### Functionality:

- Access to **Sample Module 2** works exactly as in **Sample Module 1**:
  - **Read Permission**: View content.
  - **Write Permission**: Modify content.
  - **No Permission**: The module is hidden from the user’s view entirely.

#### Example:

- A user with **Write** permission on **Sample Module 2** will be able to see and interact with editable content, while users without **Write** or **Read** permission won’t be able to see the module.

---

### Key Features

1. **Full RBAC Implementation**

   - The system uses role-based access control to limit access to various modules, functionalities, and pages based on user roles and permissions.
   - Permissions are defined at a granular level (e.g., CRUD operations), allowing fine-tuned control over what a user can and cannot do.

2. **Granular Permission System**

   - Permissions are created by selecting a module and specifying at least one CRUD operation (Create, Read, Update, Delete). These permissions can be assigned to any role.
   - Each user can have multiple roles, and each role can have multiple permissions.

3. **Dynamic UI Based on Permissions**

   - Navigation menus and page visibility are based on user permissions.
   - Pages and sections are only accessible if the user has the required permissions, ensuring security and proper access control.

4. **Password Management**
   - Users can change their password through a secure page, and access to this page is controlled by user roles and permission settings.

### Setup Instruction:

- **Prerequisites**: Make sure the user has installed Node.js and npm.
- **Steps to Set Up the Project**:

  - Install the necessary dependencies using `npm install`.
  - Start the frontend server using `npm run dev`.
  - Set up and run the mock API using
    `npx json-server --watch db.json --port 3000`
    by following the instructions provided.

### Login Credential

- Email : `admin@rbac.ui`
- Password : `admin@123`
