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
        border: 'solid #000',
        borderRadius: '15px',
        margin: '30px',
        backgroundImage: `linear-gradient(to right, #ffadad, #FFD6A5,
          #FDFFB6, #CAFFBF, #9BF6FF, #A0C4FF,
          #BDB2FF, #FFC6FF)`,
      }}
      sticky="top"
      // bg={theme}
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
      <h4 style={{textAlign: 'center'}}>
        You Got It!
      </h4>
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
        >
          {/* <h4 style={{marginBottom: '0px'}} >
            Sign Out
          </h4> */}
          <img src='./sign-out-option.png'
            style={{
              height: '30px',
              width: '30px',
            }}/>
        </Nav.Link>
      </Nav>


      {/* <Button
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
      </Button> */}

    </Navbar>
  );
};

export default NvisionNavbar;

NvisionNavbar.propTypes = {
  setGlobalTheme: PropTypes.func,
};
