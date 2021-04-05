import React, {useContext} from 'react';
import {Context} from './globalState.js';
import {Navbar, NavDropdown} from 'react-bootstrap';
import styles from '../styles/Home.module.css';

const NvisionNavbar = () => {
  const {theme} = useContext(Context);
  console.log('theme is: ', theme);
  return (
    <Navbar fixed="top" bg={theme} variant={theme}>
      <Navbar.Brand href="#home">
        <h1 className="titleFont">
          nVision Nutrition
        </h1>
      </Navbar.Brand>
      <NavDropdown
        title="Sign Out"
        id="basic-nav-dropdown"
      >
        <NavDropdown.Item >
          {`Account Page PlaceHolder`}
          {`Sign Out PlaceHolder`}
        </NavDropdown.Item>
      </NavDropdown>
    </Navbar>
  );
};

export default NvisionNavbar;
