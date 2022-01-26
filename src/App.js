import React,{useState} from "react";
import Routers from "./Routers";
import "./App.css";
import { Container } from "react-bootstrap";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

export default function App() {

  //git test
  const [user,setUser] = useState("")
  const [footershow,setFootershow] = useState(true)

  return (
    <div className="App">
      {user}
      <Header />
      <Routers user={user} setUser={setUser} setFootershow={setFootershow}/>
      {/* {footershow && <Footer />} */}
    </div>
  );
}
