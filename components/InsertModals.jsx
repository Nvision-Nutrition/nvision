import React, {useState, useContext, useEffect} from 'react';
import {Context} from './globalState.js';
import {
  Container, Modal, Button, Form,
} from 'react-bootstrap';
import axios from 'axios';
import NumPad from 'react-numpad';
import Celebration from './Celebration.jsx';
import Failure from './Failure.jsx';
import styles from '../styles/Home.module.css';

const InsertModals = ({show, type, handleClose, valid, setValid}) => {
  const [meal, setMeal] = useState('Select a Meal');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [val, setVal] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [motivate, setMotivate] = useState(false);

  const addToDate = (dateString) => {
    const previous = Number(dateString.slice(-2));
    const updated = previous + 1;
    let newDate;
    if (updated < 10) {
      newDate = dateString.slice(0, -1).concat(updated);
    } else {
      newDate = dateString.slice(0, -2).concat(updated);
    }
    return newDate;
  };

  const [formatted, setFormatted] =
  useState(new Date(addToDate(date)).toDateString());

  const {userInfo,
    userId,
    calorieCount,
    setCalorieCount,
    waterCount,
    setWaterCount} = useContext(Context);

  const handleChange = (e) => {
    setMeal(e.target.value);
  };

  const addFood = (e) => {
    e.preventDefault();
    const foodEntry = {
      userId: userId,
      mealType: 'food',
      calories: val,
      mealName: meal,
      usersDate: date,
    };
    axios.post('/api/addCalories', foodEntry)
        .then((res) => {
          setVal(0);
          setMeal('Select a Meal');
          setValid('');
        })
        .catch((err) => {
          console.error(err);
        });
  };

  const addWater = (e) => {
    e.preventDefault();
    const waterEntry = {
      waterType: 'water',
      userId: userId,
      water: val,
      usersDate: date,
    };
    axios.post('/api/addWater', waterEntry)
        .then((res) => {
          setVal(0);
          setValid('');
        })
        .catch((err) => {
          console.error(err);
        });
  };

  const addWeight = (e) => {
    e.preventDefault();
    const weightEntry = {
      type: 'weight',
      weight: val,
      usersDate: date,
      userId: userId,
    };
    axios.post('/api/addWeight', weightEntry)
        .then((res) => {
          console.log(res);
          setVal(0);
          setValid('');
        })
        .catch((err) => {
          console.error(err);
        });
  };


  const handleInput = (e) => {
    e.preventDefault();
    if (type === 'food' && meal !== 'Select a Meal' && val) {
      addFood(e);
      setCalorieCount(calorieCount + val);
      calorieCount <= userInfo.calorieGoal ?
      setCelebrate(true) : setMotivate(true);
      handleClose();
    } else if (type === 'water' && val) {
      addWater(e);
      setWaterCount(waterCount + val);
      setCelebrate(true);
      handleClose();
    } else if (type === 'weight' && val) {
      addWeight(e);
      val <= userInfo.weightGoal ?
      setCelebrate(true) : setMotivate(true);
      handleClose();
    } else {
      setValid(false);
    }
  };

  const myTheme = {
    header: {
      primaryColor: '#dc3545',
      secondaryColor: '#ECEFF1',
      highlightColor: '#FFC107',
      backgroundColor: '#dc3545',
    },
    body: {
      primaryColor: '#000000',
      secondaryColor: '#32a5f2',
      highlightColor: '#FFC107',
      backgroundColor: '#000000',
    },
    panel: {
      backgroundColor: '#dc3545',
    },
    global: {
      fontFamily: 'Indie Flower, cursive',
      // fontFamily: 'Roboto, Helvetica Neue, Arial, sans-serif, Helvetica',
    },
  };

  return (
    <>
      <Container>
        <Modal
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton
            style={{
              borderBottom: '0 none',
            }}/>
          <Modal.Header
            className="d-flex
          justify-content-center
          text-center
          align-self-center
          align-items-center">
            <Modal.Title>
              {
                  type === 'food' ?
                  <div style={{
                    backgroundImage: `linear-gradient(to left, #ef5350, #f48fb1,
                      #7e57c2, #2196f3, #26c6da, #43a047,
                      #F9C74F, #f9a825, #ff5722)`,
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}>
                  Meal Entry
                    <img src='/restaurant.png'
                      style={{
                        height: '20px',
                        width: '20px',
                      }}/>
                  </div> :
                  type === 'water' ?
                  <div style={{
                    backgroundImage: `linear-gradient(to left, #ef5350, #f48fb1,
                      #7e57c2, #2196f3, #26c6da, #43a047,
                      #F9C74F, #f9a825, #ff5722)`,
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}>
                    Water Entry <img src='/drop.png'
                      style={{
                        height: '20px',
                        width: '20px',
                      }}/>
                  </div> :
                  <div style={{
                    backgroundImage: `linear-gradient(to left, #ef5350, #f48fb1,
                      #7e57c2, #2196f3, #26c6da, #43a047,
                      #F9C74F, #f9a825, #ff5722)`,
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}>
                  Weight Update <img src='/weight-scale.png'
                      style={{
                        height: '20px',
                        width: '20px',
                        align: 'center',
                      }}/>
                  </div>
              }
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            className="d-flex
          justify-content-center
          text-center
          align-self-center
          align-items-center">
            <Form>
              {
                type === 'food' &&
                <>
                  <Form.Label>
                    Meal Type
                  </Form.Label>
                  <select
                    value={meal}
                    className="form-control"
                    onChange={handleChange}>
                    <option value="Select a Meal">Select a Meal</option>
                    <option value="breakfast">breakfast</option>
                    <option value="lunch">lunch</option>
                    <option value="dinner">dinner</option>
                    <option value="snack">snack</option>
                  </select>
                </>
              }
              <br/>
              {
                type === 'food' ? <Form.Label>Calories</Form.Label> :
                type === 'water' ? <Form.Label>Water (oz)</Form.Label> :
                <Form.Label>Weight (lb)</Form.Label>
              }
              <br/>
              <NumPad.Number
                onChange={(value) => {
                  setVal(value);
                }}
                position='center'
                value={val}
                decimal={2}
                theme={myTheme}
              />
              <br/>
              <br/>
              <Form.Label>Date</Form.Label>
              <br/>
              <NumPad.Calendar
                onChange={(value) => {
                  setDate(value);
                  setFormatted(addToDate(value));
                }}
                dateFormat="YYYY-MM-DD"
                min="2021-04-05"
                placeholder={new Date(formatted).toDateString()}
                theme={myTheme}
              />
              <br/>
              <br/>
              {
                valid === false &&
                <div
                  style={{
                    color: '#dc3545',
                  }}>
                  Please complete entry
                </div>
              }
              <br/>
              <Button
                variant="outline-danger"
                onClick={(e) => {
                  handleInput(e);
                }}>
                Record it!
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <Celebration
          show={celebrate}
          onHide={() => setCelebrate(false)}
          name={userInfo.firstName}
        />
        <Failure
          show={motivate}
          onHide={() => setMotivate(false)}
          name={userInfo.firstName}
        />
      </Container>
    </>
  );
};

export default InsertModals;
