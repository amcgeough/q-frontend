import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
// import Navbar from 'react-bootstrap';
import './navigation.css'


// import {Navbar, Nav, NavItem } from 'react-bootstrap';

export default class Navigation_App extends Component {
    render() {
      return (
<Navbar inverse>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#home">Home</a>
    </Navbar.Brand>
  </Navbar.Header>
  <Nav>
    <NavItem eventKey={1} href="#">
      Admin
    </NavItem>
    <NavItem eventKey={2} href="#">
      Dashboard
    </NavItem>
    <NavDropdown eventKey={3} title="Actions" id="basic-nav-dropdown">
      <MenuItem eventKey={3.1}>Action</MenuItem>
      <MenuItem eventKey={3.2}>Another action</MenuItem>
      <MenuItem eventKey={3.3}>Something else here</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey={3.4}>Separated link</MenuItem>
    </NavDropdown>
  </Nav>
</Navbar>
      );
    }
  }
  
// export default Navigation_App;
