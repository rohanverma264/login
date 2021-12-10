import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import { useHistory } from "react-router-dom";
import { Dropdown } from "../Dropdown";

export const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [number, setNumber] = useState("");
  const [pic, setPic] = useState(null);
  const [type, setType] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [dob, setDob] = useState("");

  const history = useHistory();

  const data = new FormData();
  data.append("name", name);
  data.append("email", email);
  data.append("password", password);
  data.append("number", number);
  data.append("pic", pic);
  data.append("dob", dob);
  data.append("state", state);
  data.append("city", city);
  data.append("type", type);

  const submit = () => {
    if (password === confirmPassword) {
      axios
        .post("http://localhost:3001/admin/addUser", data)
        .then(alert("Registered successfully"))
        .then(history.push("/admin"))
        .then(window.location.reload());
    } else {
      alert("Password and Confirm Password mismatch.");
    }
  };
  return (
    <div style={{ paddingTop: "70px" }}>
      <div>
        <div className="my-4">
          <h1 className="text-center">REGISTER HERE</h1>
        </div>
        <div className="form-div">
          <form
            className="form d-flex flex-column justify-content-evenly m-auto"
            encType="multipart/form-data"
          >
            <label>Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />

            <label>Email</label>
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <label>Confirm Password</label>
            <input
              type="password"
              id="confirm_password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />

            <label>Number</label>
            <input
              type="text"
              id="number"
              onChange={(e) => setNumber(e.target.value)}
            />

            <label>Choose profile picture</label>
            <input
              style={{ border: "none", fontSize: "14px" }}
              type="file"
              id="image"
              onChange={(e) => {
                setPic(e.target.files[0]);
              }}
            />

            <label>Date of Birth</label>
            <input type="date" onChange={(e) => setDob(e.target.value)} />

            <Dropdown
              place={(State) => setState(State)}
              region={(City) => setCity(City)}
              stateValue = {state}
              cityValue = {city}
            />

            <label>Type</label>
            <RadioGroup
              onChange={(e) => setType(e.target.value)}
              style={{ flexDirection: "row" }}
            >
              <FormControlLabel value="user" control={<Radio />} label="User" />
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Admin"
              />
            </RadioGroup>

            <Button className="my-3" variant="primary" onClick={submit}>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
