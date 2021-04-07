import React, {useState} from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';
import styles from '../styles/Home.module.css';
import CalorieTracker from './CalorieTracker.jsx';
import InsertModals from './InsertModals.jsx';

const DailyTracker = () => {
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
      <Container>
        <Row>
          <Col>
            <Button
              variant="outline-warning"
              onClick={(e) => {
                handleOpen();
                setType('food');
              }}
              style={{
                width: '100%',
                height: '100%',
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
            <div className={`${styles.card} daily-tracker`}>
              <CalorieTracker />
            </div>
          </Col>
          <Col>
            <Button
              variant="outline-primary"
              style={{
                width: '100%',
                height: '100%',
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
          <Col>
            <Button
              variant="outline-success"
              style={{
                width: '100%',
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
      />
    </>
  );
};

export default DailyTracker;
