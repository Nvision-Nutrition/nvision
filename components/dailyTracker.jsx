import React, {useState, useContext} from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';
import {Context} from './globalState.js';
import CalorieTracker from './CalorieTracker.jsx';
import InsertModals from './InsertModals.jsx';

const DailyTracker = ({celebrate, setCelebrate}) => {
  const {userInfo, calorieCount} = useContext(Context);
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
          <Col
            className="calorie-tracker"
          >
            <h3>{`Today's Progress`}</h3>
          </Col>
        </Row>
        <Row>
          <Col
            className="calorie-tracker"
          >
            <h3>{`${calorieCount} / ${userInfo.calorieGoal}`}</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={2} xl={3}></Col>
          <Col
            xs={6}
            xl={6}
            className="calorie-tracker"
          >
            <CalorieTracker />
          </Col>
          <Col xs={2} xl={3}></Col>
        </Row>
        <Row>
          <Col className="d-flex
          justify-content-center
          text-center
          align-self-center
          align-items-center"
          >
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
                border: '3px solid #A0C4FF',
                backgroundColor: '#FFFFFC',
              }}
              title='calorie-btn'>
              <img src='/restaurant.png'
                style={{
                  height: '40px',
                  width: '40px',
                }}/>
            </Button>
          </Col>
          <Col className="d-flex
          justify-content-center
          text-center
          align-self-center
          align-items-center">
            <Button
              bsPrefix="water-btn"
              style={{
                width: '70%',
                height: '70%',
                marginTop: '30px',
                marginBottom: '15px',
                borderBottomLeftRadius: '0px',
                borderBottomRightRadius: '0px',
                borderRadius: '10%',
                border: '3px solid #A0C4FF',
                backgroundColor: '#FFFFFC',
              }}
              onClick={(e) => {
                handleOpen();
                setType('water');
              } }>
              <img src='/drop.png'
                style={{
                  height: '40px',
                  width: '40px',
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
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '0px',
                borderRadius: '10%',
                marginTop: '30px',
                marginBottom: '15px',
                border: '3px solid #A0C4FF',
                backgroundColor: '#FFFFFC',
              }}
              onClick={(e) => {
                handleOpen();
                setType('weight');
              } }>
              <img src='/weight-scale.png'
                style={{
                  height: '40px',
                  width: '40px',
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
