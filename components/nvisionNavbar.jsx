import React, {useContext} from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import {Context} from './globalState.js';


const NvisionNavbar = () => {
  const {theme, setTheme} = useContext(Context);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };


  return (
    <Navbar
      style={{justifyContent: 'space-between'}}
      sticky="top"
      bg={theme}
      variant={theme}
    >
      <Navbar.Brand>
        <h1 className="titleFont">
          nVision Nutrition
        </h1>
      </Navbar.Brand>

      <Button
        variant={theme === 'light' ? 'outline-dark' : 'outline-light'}
        onClick={toggleTheme}>
        <Brightness2Icon/>
      </Button>

      <Nav>
        <Nav.Link
          style={{
            alignSelf: 'center',
            display: 'inline-flex',
            marginLeft: '25px',
            marginRight: '25px',
            fontFamily: 'Fredoka One, Open Sans, Arial',
          }}
        > <h3>Sign Out</h3></Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NvisionNavbar;
