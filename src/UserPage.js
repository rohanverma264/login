import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export const UserPage = () => {
  const email = sessionStorage.getItem("email");
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);
  const [userName, setUserName] = useState("");
  const [newName, setNewName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [source, setSource] = useState("")
  const [date, setDate] = useState("")
  const [dayDate, setdayDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("")


  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/${email}`)
      .then((res) => {
        if (res.data[0] === undefined) {
          history.push("/login");
        } else {
          const { name, email, number, profile_pic, d_o_b } = res.data[0];
          setUserName(name);
          setUserEmail(email);
          setUserNumber(number);
          setSource(`http://localhost:3001/profile_pic/${profile_pic}`);
          setNewName(userName);
          const newdate = new Date(d_o_b).toLocaleString("en-IN", {timeZone: "Asia/Kolkata"}).substr(0,8)
          setDate(newdate);
          console.log(newdate);
          
          // setYear(d_o_b.substr(0,4))
          // setMonth(d_o_b.substr(5,2))
          // setdayDate(d_o_b.substr(8,2))
          // setDate(new Date(`${year}/${month}/${dayDate}`))
        }
      })
      .then((err) => {
        if (err) console.log(err);
      });
  }, [userName, userEmail, userNumber, source, email, history]);

  const logout = () => {
    sessionStorage.clear();
    history.push("/login");
  };

  const editHandler = () => {
    setShowInput(true);
  };

  const updateHandler = () => {
    axios
      .put(`http://localhost:3001/user/${email}`, {
        name: newName,
      })
      .then(history.push("/user"));
    setShowInput(false);
  };


  return (
    <div>
      <div
        className="d-flex justify-content-around py-3"
        style={{ backgroundColor: "lightGrey" }}
      >
        <div>
          <h2>Hello {userName}!</h2>
        </div>
        <div>
          <Button onClick={logout}>Logout</Button>
        </div>
      </div>
      <div>
        <h2 className="text-center my-5">User details</h2>
        <form className="userForm m-5">
          <div className="image">
            <img alt="profile" src={source} width="100%"></img>
          </div>
          <span>
            {!showInput ? (
              <h4 className="d-inline mx-3">Name: {userName}</h4>
            ) : (
              <input
                type="text"
                className="mx-3"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            )}
            {!showInput ? (
              <Button type="button" onClick={editHandler}>
                Edit
              </Button>
            ) : (
              <span>
                <Button type="button" className="me-2" onClick={updateHandler}>
                  Update
                </Button>
                <Button type="button" onClick={() => setShowInput(false)}>
                  Cancel
                </Button>
              </span>
            )}
          </span>
          <div>
            <h4>Email: {userEmail}</h4>
            <h4>Number: {userNumber}</h4>
            <h4>D.O.B : {date}</h4>
          </div>
        </form>
      </div>
    </div>
  );
};
