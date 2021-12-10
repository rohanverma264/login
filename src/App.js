import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RegForm } from "./regForm";
import { UserPage } from "./UserPage";
import { LoginForm } from "./LoginForm"
import { Admin } from "./Admin/Admin";
// import { AddUser } from "./Admin/AddUser";
// import { EditUser } from "./Admin/EditUser";

function App() {
  return(
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={RegForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/user" component={UserPage} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
