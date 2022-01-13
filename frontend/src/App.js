import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Welcome from "./components/Welcome";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
<<<<<<< HEAD
      <Router>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "gray",
          }}
        >
          <div style={{ paddingTop: "15px" }}>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <span onClick={Logout}>logout</span>
          </div>
        </div>
=======
    <Router>
      <div style={{display:"flex",justifyContent:"space-around",backgroundColor:"gray"}}>

        <div className="welcome">
          <p>
            Welcome, <span>{user.name}</span>
          </p>
        </div>

        <div style={{paddingTop:"15px"}}>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <span onClick={Logout}>logout</span>
        </div>

    

      </div>

      <Switch>
        <Route path="/login"><LoginForm Login={Login} error={error} /></Route>
        <Route path="/signup" component={SignupForm}></Route>
      </Switch>
>>>>>>> 38d8132ea517bc035626af134d54ef8b3e264506

        <Switch>
          <Route path="/login">
            <LoginForm Login={Login} error={error} />
          </Route>
          <Route path="/signup" component={SignupForm}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
