import React from "react";
import { Link, useHistory } from 'react-router-dom'
import {Navbar,Nav,Col,} from "react-bootstrap";
import './css/Header.css'


function Header() {
  
  const history = useHistory();
  return (
    <Navbar className='nav' expand="lg" bg="light">
      <Col className='left' xs={3}>
        <Nav className="me-auto">
          <Nav.Link><Link to="/" className="link">Home</Link></Nav.Link>
          <Nav.Link><Link to="/feed" className="link">Map & Feed</Link></Nav.Link>
        </Nav>
      </Col>
      <Col className='center' xs={6} >
        <Navbar.Brand className='link_img'>
          <Link to="/" className="link_img">Cafe Curator </Link>
        </Navbar.Brand>
      </Col>
      <Col  xs={3}>
        <Nav className='right'>
          <Nav.Link><Link to="/login" className="link">Login</Link></Nav.Link>
          <Nav.Link><Link to="/signup" className="link">Signup</Link></Nav.Link>
          <div className="profile">
          <img className="prof_img"
            src={process.env.PUBLIC_URL + "/image/hello.png"}
            onClick={()=>{history.push('/profile/0')}}/>
          </div>
        </Nav>
      </Col >
    </Navbar>
  );
}
export default Header;