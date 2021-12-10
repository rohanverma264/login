import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { AddUser } from "./AddUser";
import { EditUser } from "./EditUser";
import { LeftNav } from "./LeftNav";
import { NavBar } from "./NavBar";

export const Admin = () => {
  return (
    <div>
      <Router>
        <NavBar />
        <LeftNav />
        <Switch>
          <Route exact path="/admin" component={Dashboard} />
          <Route exact path="/admin/addUser" component={AddUser} />
          <Route exact path="/admin/editUser" component={EditUser} />
        </Switch>
      </Router>
    </div>
  );
};
