import React,{useState} from "react";
import Routers from "./Routers";
import "./App.css";
import { Container } from "react-bootstrap";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

export default function App() {

  //git test
  const [user,setUser] = useState(localStorage.getItem('userNo'))
  const [footershow,setFootershow] = useState(true)
  console.log(user)

  return (
    <div className="App">

      <Header user={user} setUser={setUser} />
      <Routers user={user} setUser={setUser} setFootershow={setFootershow}/>
      {footershow && <Footer />}
    </div>
  );
}
