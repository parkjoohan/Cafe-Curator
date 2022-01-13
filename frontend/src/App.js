import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import "./App.css";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'


function App() {
  const adminUser = {
    email: "admin@ssafy.com",
    password: "ssafy",
  };

  const [user, setUser] = useState({ name: "익명", email: "" });
  const [error, setError] = useState("");

  const Login = (details) => {
    console.log(details);

    if (
      details.email == adminUser.email &&
      details.password == adminUser.password
    ) {
      console.log("로그인되었습니다.");
      setUser({
        name: details.name,
        email: details.email,
      });
    } else {
      console.log("로그인에 실패하였습니다");
      setError("로그인에 실패하였습니다");
    }
  };

  const Logout = () => {
    setUser({ name: "익명", email: "" });
  };
  return (
    <div className="App">
    <Router>
      
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>

      <div className="welcome">
        <h2>
          Welcome, <span>{user.name}</span>
        </h2>
        <button onClick={Logout}>Logout</button>
      </div>

      <Switch>
        <Route path="/login"><LoginForm Login={Login} error={error} /></Route>
        <Route path="/signup" component={SignupForm}></Route>
      </Switch>

    </Router>
    </div>
  );
}

export default App;
