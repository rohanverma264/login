import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useHistory } from "react-router-dom";

export const LoginForm = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");


  const data = {
    email: loginEmail,
    password: loginPassword,
  };

  let history = useHistory();
  const submit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", data)
      .then((res) => {
        alert(res.data);
        if (res.data === "Login Successfull") {
          sessionStorage.setItem('email' , loginEmail)
          history.push("/user");
        }
        else if (res.data === "Admin Logged in.") {
          sessionStorage.setItem('email' , loginEmail)
          history.push("/admin");
        }
      })
  };

  return (
    <div>
      <div className="my-5">
        <h1 className="text-center">Login Here</h1>
      </div>
      <form className="form d-flex flex-column justify-content-evenly m-auto" onSubmit={submit}>
        <label>Email</label>
        <input
          type="text"
          id="loginEmail"
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          id="loginPassword"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <Button className="my-3" variant="primary" type="submit">
          Submit
        </Button>
      </form>
      <div className="text-center my-3">
        <h5>
          Not registered?
          <Link to="/">
            <Button className="mx-2" variant="primary">
              Register
            </Button>
          </Link>
        </h5>
      </div>
    </div>
  );
};
