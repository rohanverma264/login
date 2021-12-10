import React, { useEffect, useState } from "react";
import axios from "axios";

export const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:3001/user").then((res) => {
      setUserCount(res.data.length);
    });
  });

  useEffect(() => {
    axios.get("http://localhost:3001/admin").then((res) => {
      setAdminCount(res.data.length);
    });
  });
  return (
    <div className="dashboard">
      <div className="card">
        <h3>No. Of Users</h3>
        <h1>{userCount}</h1>
      </div>
      <div className="card">
        <h3>No. Of Admins</h3>
        <h1>{adminCount}</h1>
      </div>
    </div>
  );
};
