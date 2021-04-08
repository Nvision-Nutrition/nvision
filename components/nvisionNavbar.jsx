import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Navbar, Nav, Button} from 'react-bootstrap';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import {Context} from './globalState.js';

const NvisionNavbar = ({setGlobalTheme, signOut, session}) => {
  const {theme, setTheme} = useContext(Context);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      setGlobalTheme('dark');
    } else {
      setTheme('light');
      setGlobalTheme('light');
    }
  };

  return (
    <Navbar
      style={{
        justifyContent: 'space-between',
        border: 'solid #28A745',
        borderRadius: '15px',
        padding: '0px',
      }}
      sticky="top"
      bg={theme}
      variant={theme}
    >
      <Navbar.Brand>
        <div>
          <img
            src="/logo.png"
            width="80"
            height="80"
            alt="nVision logo"
          />
        </div>
      </Navbar.Brand>

      <Nav>
        <Nav.Link
          onClick={signOut}
          style={{
            alignSelf: 'center',
            display: 'inline-flex',
            marginLeft: '25px',
            marginRight: '25px',
            fontFamily: 'Indie Flower, cursive',
            border: 'solid 1px',
            borderRadius: '10px',
          }}
        > <h4 style={{marginBottom: '0px'}} >Sign Out</h4></Nav.Link>
      </Nav>

      <Button
        variant={theme === 'light' ? 'outline-dark' : 'outline-light'}
        aria-label="dark-mode-toggle"
        onClick={toggleTheme}
        style={{
          position: 'relative',
          marginBottom: '8px',
          marginRight: '3px',
          borderWeight: '1px'}}
      >
        <Brightness2Icon />
      </Button>

    </Navbar>
  );
};

export default NvisionNavbar;

NvisionNavbar.propTypes = {
  setGlobalTheme: PropTypes.func,
};
