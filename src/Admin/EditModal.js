import React, { useState, useContext, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import axios from "axios";
import { Context } from "../ContextProvider";
import { Dropdown } from "../Dropdown";

export const EditModal = (props) => {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newType, setNewType] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newState, setNewState] = useState("");
  const [newCity, setNewCity] = useState("");

  const {
    data: { edit_details },
  } = useContext(Context);

  const { user_id } = edit_details;
  const id = user_id;

  useEffect(() => {
    axios
      .get(`http://localhost:3001/admin/editUser/${id}`)
      .then((res) => {
        const { name, email, number, type, state, city } = res.data[0];
        const d_o_b = res.data[0].d_o_b;
        setNewName(name);
        setNewEmail(email);
        setNewNumber(number);
        setNewType(type);

        const date = (new Date(d_o_b).getDate() < 10 ? `0${new Date(d_o_b).getDate()}` : new Date(d_o_b).getDate());
        
        const month = (new Date(d_o_b).getMonth() + 1 < 10 ? `0${new Date(d_o_b).getMonth() + 1 }` : new Date(d_o_b).getMonth() + 1 );
        
        const year = new Date(d_o_b).getFullYear();

        setNewDate(`${year}-${month}-${date}`);
        setNewState(state);
        setNewCity(city);
      })
      .then((err) => {
        if (err) console.log(err);
      });
  }, [id]);

  const submitHandler = () => {
    axios
      .put(`http://localhost:3001/admin/editUser/${id}`, {
        name: newName,
        email: newEmail,
        number: newNumber,
        type: newType,
        id: id,
        d_o_b: newDate,
        state: newState,
        city: newCity,
      })
      .then((err) => {
        if (err) {
          console.log("Error :  ", err);
        }
        alert("Updated successfully.");
      })
      .then(window.location.reload());
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit :</Modal.Title>
      </Modal.Header>
      <Modal.Body className="form m-auto" style={{ boxShadow: "none" }}>
        <div style={{ width: "100%" }}>
          <div className="editForm">
            <label>Name :</label>
            <input
              type="text"
              id="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="editForm">
            <label>Email :</label>
            <input
              type="text"
              id="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <div className="editForm">
            <label>Number :</label>
            <input
              type="text"
              id="number"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
            />
          </div>
          <div className="editForm">
            <label>D.O.B :</label>
            <input
              type="date"
              id="date"
              value={newDate}
              onChange={(e) => {
                setNewDate(e.target.value);
                console.log(newDate);
              }}
            />
          </div>

          <Dropdown
            place={(State) => setNewState(State)}
            region={(City) => setNewCity(City)}
            stateValue={newState}
            cityValue={newCity}
          />

          <div className="editForm">
            <label>Type :</label>
            <RadioGroup
              style={{ flexDirection: "row" }}
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
            >
              <FormControlLabel value="user" control={<Radio />} label="User" />
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Admin"
              />
            </RadioGroup>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={submitHandler}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
