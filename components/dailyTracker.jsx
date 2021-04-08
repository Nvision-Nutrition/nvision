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


  return (
    <>
      <Container style={{
        border: 'solid grey',
        borderRadius: '5px',
        borderWidth: '1px',
        zIndex: '1'}}>
        <Row>
          <Col style={{paddingLeft: '0px'}}>
            <Button
              // variant="outline-success"
              onClick={(e) => {
                handleOpen();
                setType('food');
              }}
              style={{
                width: '100%',
                height: '100%',
                borderBottomLeftRadius: '0px',
                borderBottomRightRadius: '0px',
                backgroundColor: 'white',
              }}
              title='calorie-btn'>
              <img src='/restaurant.png'
                style={{
                  height: '28px',
                  width: '28px',
                }}/>
            </Button>
          </Col>
          <Col xs={6}>
            {/* <div className={`${styles.card} daily-tracker`}> */}
            <CalorieTracker />
            {/* </div> */}
          </Col>
          <Col style={{paddingRight: '0px'}}>
            <Button
              // variant="outline-success"
              style={{
                width: '100%',
                height: '100%',
                borderBottomLeftRadius: '0px',
                borderBottomRightRadius: '0px',
                backgroundColor: 'white',
              }}
              onClick={(e) => {
                handleOpen();
                setType('water');
              } }>
              <img src='/drop.png'
                style={{
                  height: '28px',
                  width: '28px',
                }}/>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col style={{paddingRight: '0px', paddingLeft: '0px'}}>
            <Button
              // variant="outline-success"
              style={{
                width: '100%',
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '0px',
                backgroundColor: 'white',
              }}
              onClick={(e) => {
                handleOpen();
                setType('weight');
              } }>
              <img src='/weight-scale.png'
                style={{
                  height: '28px',
                  width: '28px',
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
