import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./ContextProvider";
import OtpModal from "./OtpModal";
import { Dropdown } from "./Dropdown";

export const RegForm = (props) => {
  const context = useContext(Context);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [number, setNumber] = useState("");
  const [pic, setPic] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");

  const submit = () => {
    context.newValue("reg", {
      name,
      email,
      password,
      number,
      pic,
      state,
      city,
      date,
    });

    if (password === confirmPassword) {
      setModalShow(true);
    } else {
      alert("Password and Confirm Password mismatch.");
    }
  };

  return (
    <div className="App">
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
            <input type="date" onChange={(e) => setDate(e.target.value)} />

            <Dropdown
              place={(State) => setState(State)}
              region={(City) => setCity(City)}
              stateValue = {state}
              cityValue = {city}
            />

            <Button className="my-3" variant="primary" onClick={submit}>
              Submit
            </Button>
          </form>
          <div className="text-center my-3">
            <h5>
              Already registered?
              <Link to="/login">
                <Button className="mx-3" variant="primary">
                  Log In
                </Button>
              </Link>
            </h5>
          </div>
        </div>
      </div>
      {modalShow === true && (
        <OtpModal show={modalShow} onHide={() => setModalShow(false)} />
      )}
    </div>
  );
};
