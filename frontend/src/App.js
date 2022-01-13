import React, { useState } from "react";
import Routers from "./Routers";
import "./App.css";
import {BrowserRouter as Router, Link} from 'react-router-dom'
import { Container } from "react-bootstrap";


export default function App() {
  const [user, setUser] = useState({ name: "익명", email: "" });

  const Logout = () => {
    setUser({ name: "익명", email: "" });
  };

  return (
    <div className="App">

      <Container>
        <div style={{display:"flex",justifyContent:"space-around",backgroundColor:"gray"}}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "gray",
          }}
        >
        </div>
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
        <Routers/>
      </Container>
    </div>
  );
}


