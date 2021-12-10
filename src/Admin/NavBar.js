import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export const NavBar = () => {
  const email = sessionStorage.getItem("email");
  const history = useHistory();
  const [userName, setUserName] = useState("");

  const logout = () => {
    sessionStorage.clear();
    history.push("/login");
    window.location.reload()
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/${email}`)
      .then((res) => {
        if (res.data[0] === undefined) {
          history.push("/login");
        } else {
          const { name } = res.data[0];
          setUserName(name)
        }
      })
      .then((err) => {
        if (err) console.log(err);
      });
  },[email, history]);



  return (
    <div>
      <div
        className="d-flex justify-content-around py-3"
        style={{
          backgroundColor: "lightGrey",
          position: "fixed",
          top: "0",
          width: "100%",
        }}
      >
        <div>
          <h2>Hello {userName}!</h2>
        </div>
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {userName}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
