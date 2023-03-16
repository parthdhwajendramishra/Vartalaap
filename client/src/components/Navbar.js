import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {  unsetUserInfo } from '../store/userSlice';
import { unsetUserToken } from '../store/authSlice';
import {  removeToken } from '../services/localStorageService';
const NavBar = () => {
  const { token } = useSelector(state => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(unsetUserToken({ token: null }))
    dispatch(unsetUserInfo({ name: "", email: "" }))
    removeToken('token')
    navigate('/login')
  }
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink className="nav-link" exact to="/">
            Home
          </NavLink>

          <NavLink className="nav-link" to="/about">
            About
          </NavLink>

          <NavLink className="nav-link" to="/contact">
            Contact
          </NavLink>

         
          {
            !token? <NavLink className="nav-link" to="/login">
            Login
          </NavLink>: <NavLink className="nav-link" to="/login" onClick={handleLogout}>
            Logout
          </NavLink>
          }

          

          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">
              Something
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
