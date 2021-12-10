import axios from "axios";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { Table, Button } from "react-bootstrap";
import { EditModal } from "./EditModal";
import { Context } from "../ContextProvider";

export const EditUser = () => {
  const [user, setUser] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const context = useContext(Context);

  useEffect(() => {
    axios.get("http://localhost:3001/users").then((res) => {
      const userData = res?.data;
      setUser(userData);
      console.log(res.data);
    });
  }, []);

  const editHandler = (user) => {
    setModalShow(true);
    const { name, email, number, type, user_id, state, city } = user;

    const d_o_b = user.d_o_b.substr(0, 10);

    context.newValue("edit_details", {
      name,
      email,
      number,
      type,
      user_id,
      d_o_b,
      state,
      city,
    });
  };

  const deleteHandler = useCallback((user) => {
    axios
      .delete(`http://localhost:3001/admin/editUser/${user.user_id}`)
      .then((res, err) => {
        if (err) {
          console.log("Error :  ", err);
        }
      });
  }, []);

  const usersData = user;
  return (
    <div style={{ paddingTop: "80px", width: "70%", margin: "auto" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Date Of Birth</th>
            <th>State</th>
            <th>City</th>
            <th>Profile pic</th>
            <th>Type</th>
            <th colSpan="2">Operations</th>
          </tr>
        </thead>
        <tbody>
          {usersData?.map((user) => {
            const date =
              new Date(user.d_o_b).getDate() < 10
                ? `0${new Date(user.d_o_b).getDate()}`
                : new Date(user.d_o_b).getDate();

            const month =
              new Date(user.d_o_b).getMonth() + 1 < 10
                ? `0${new Date(user.d_o_b).getMonth() + 1}`
                : new Date(user.d_o_b).getMonth() + 1;

            const year = new Date(user.d_o_b).getFullYear();
            return (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.number}</td>
                <td>{`${date}-${month}-${year}`}</td>
                <td>{user.state}</td>
                <td>{user.city}</td>
                <td>
                  <div className="image">
                    <img
                      alt="profile"
                      src={`http://localhost:3001/profile_pic/${user.profile_pic}`}
                      width="100%"
                    ></img>
                  </div>
                </td>
                <td>{user.type}</td>
                <td>
                  <Button onClick={() => editHandler(user)}>Edit</Button>
                </td>
                <td>
                  <Button onClick={() => deleteHandler(user)}>Delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {modalShow === true && (
        <EditModal show={modalShow} onHide={() => setModalShow(false)} />
      )}
    </div>
  );
};
