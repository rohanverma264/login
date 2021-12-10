import { Modal, Button } from "react-bootstrap";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Context } from "./ContextProvider";
import { useHistory } from "react-router-dom";

function OtpModal(props) {
  const history = useHistory();
  const {
    data: { reg },
  } = useContext(Context);

  const [otp, setOtp] = useState("");
  const [backOtp, setBackOtp] = useState("");

  const { name, email, number, pic, password, state, city, date } = reg;

  const data = new FormData();
  data.append("name", name);
  data.append("email", email);
  data.append("password", password);
  data.append("number", number);
  data.append("pic", pic);
  data.append("date", date);
  data.append("state", state);
  data.append("city", city);

  useEffect(() => {
    Axios.get(`http://localhost:3001/verify/${email}`).then((response) => {
      setBackOtp(response.data.otp);
    });
  }, [email]);


  const submit = () => {
    if (otp === backOtp) {
      Axios.post("http://localhost:3001/register", data)
        .then(alert("Registered successfully"))
        .then(history.push("/login"));
    } else {
      alert("Otp does not match.");
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter the OTP:
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ width: "100%" }}>
          <input
            type="text"
            className="text-center m-auto"
            onChange={(e) => setOtp(+e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={submit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OtpModal;
