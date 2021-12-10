import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const LeftNav = () => {
  return (
    <div>
      <div className="nav-div">
        <Nav defaultActiveKey="/home" className="flex-column nav">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/addUser">Add User</Link>
          <Link to="/admin/editUser">Edit User</Link>
        </Nav>
      </div>
    </div>
  );
};
