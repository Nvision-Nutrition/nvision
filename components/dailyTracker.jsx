import React, {useState} from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';
import styles from '../styles/Home.module.css';
import CalorieTracker from './CalorieTracker.jsx';
import InsertModals from './InsertModals.jsx';

const DailyTracker = ({celebrate, setCelebrate}) => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState('');
  const [valid, setValid] = useState('');


  const handleClose = () => {
    setShow(false);
    setValid('');
  };
  const handleOpen = () => setShow(true);

  // #ffadad, #FFD6A5,
  //         #FDFFB6, #CAFFBF, #9BF6FF, #A0C4FF,
  //         #BDB2FF, #FFC6FF

  return (
    <>
      <Container style={{
        border: 'red',
        borderColor: 'red',
        borderRadius: '5px',
        borderWidth: '1px',
        zIndex: '1'}}>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <CalorieTracker />
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col className="d-flex
          justify-content-center
          text-center
          align-self-center
          align-items-center"
          >
            {/* <button
              onClick={(e) => {
                handleOpen();
                setType('food');
              }}
              title='calorie-btn'
              className="cal-btn">
              <img src='/restaurant.png'
                style={{
                  height: '38px',
                  width: '38px',
                }}/>
            </button> */}
            <Button
              onClick={(e) => {
                handleOpen();
                setType('food');
              }}
              bsPrefix="cal-btn"
              style={{
                width: '70%',
                height: '70%',
                borderBottomLeftRadius: '0px',
                borderBottomRightRadius: '0px',
                borderRadius: '10%',
                marginTop: '30px',
                marginBottom: '15px',
                border: '3px solid #ffadad',
                // marginLeft: '10px',
                backgroundColor: '#FFFFFC',
                // boxShadow: 'inset 0px 0px 20px 0px rgba(0,0,0, 0.6)',
              }}
              title='calorie-btn'>
               {/* <div style={{
                color: 'black',
                paddingBottom: '15px'}}>Add Meal</div> */}
            <img src='/restaurant.png'
                style={{
                  height: '45px',
                  width: '45px',
                }}/>
            </Button>
          </Col>
          <Col className="d-flex
          justify-content-center
          text-center
          align-self-center
          align-items-center">
            <Button
              // variant="outline-success"
              bsPrefix="water-btn"
              style={{
                width: '70%',
                height: '70%',
                marginTop: '30px',
                marginBottom: '15px',
                // marginRight: '10px',
                borderBottomLeftRadius: '0px',
                borderBottomRightRadius: '0px',
                borderRadius: '10%',
                border: '3px solid #A0C4FF',
                backgroundColor: '#FFFFFC',
                // border: '3px solid #ffadad',
                // backgroundColor: 'rgb(31, 119, 180)',
                // boxShadow: 'inset 0px 0px 20px 0px rgba(0,0,0, 0.6)',
              }}
              onClick={(e) => {
                handleOpen();
                setType('water');
              } }>
              {/* <div style={{
                color: 'black',
                paddingBottom: '15px'}}>Add Water</div> */}
              <img src='/drop.png'
                style={{
                  height: '45px',
                  width: '45px',
                }}/>
            </Button>
          </Col>
          <Col
            className="d-flex
          justify-content-center
          text-center
          align-self-center
          align-items-center">
            <Button
              bsPrefix="update-weight"
              style={{
                width: '70%',
                height: '70%',
                // margin: '0 auto',
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '0px',
                borderRadius: '10%',
                marginTop: '30px',
                marginBottom: '15px',
                border: '3px solid #FFC6FF',
                backgroundColor: '#FFFFFC',
                // backgroundColor: 'rgb(31, 119, 180)',
                // marginBottom: '20px',
                // boxShadow: 'inset 0px 0px 20px 0px rgba(0,0,0, 0.6)',
              }}
              onClick={(e) => {
                handleOpen();
                setType('weight');
              } }>
              {/* <div style={{
                color: 'black',
                padding: '15px'}}>Update Weight</div> */}
              <img src='/weight-scale.png'
                style={{
                  height: '45px',
                  width: '45px',
                }}/>
            </Button>
          </Col>
        </Row>
      </Container>
      <InsertModals
        show={show}
        type={type}
        handleClose={handleClose}
        onHide={handleClose}
        valid={valid}
        setValid={setValid}
        celebrate={celebrate}
        setCelebrate={setCelebrate}
      />
    </>
  );
};

export default DailyTracker;
