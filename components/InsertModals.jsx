import React, {useState, useContext, useEffect} from 'react';
import {Context} from './globalState.js';
import {
  Container, Modal, Button, Form,
} from 'react-bootstrap';
import axios from 'axios';
import NumPad from 'react-numpad';
import Celebration from './Celebration.jsx';
import Failure from './Failure.jsx';

const InsertModals = ({show, type, handleClose, valid, setValid}) => {
  const [meal, setMeal] = useState('Select a Meal');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [val, setVal] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [motivate, setMotivate] = useState(false);
  const {userInfo,
    userId,
    calorieCount,
    setCalorieCount,
    waterCount,
    setWeightValue,
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
      console.log(calorieCount);
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
      setWeightValue(val);
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
      fontFamily: 'Roboto, Helvetica Neue, Arial, sans-serif, Helvetica',
    },
  };

  return (
    <>
      <Container>
        <Modal
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton >
            <Modal.Title>
              {
                  type === 'food' ?
                  <div>
                  Meal Entry <img src='/restaurant.png'
                      style={{
                        height: '20px',
                        width: '20px',
                      }}/>
                  </div> :
                  type === 'water' ?
                  <div>
                    Water Entry <img src='/drop.png'
                      style={{
                        height: '20px',
                        width: '20px',
                      }}/>
                  </div> :
                  <div>
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
          <Modal.Body>
            <Form>
              {
                type === 'food' &&
                <>
                  <Form.Label>Meal Type</Form.Label>
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
                }}
                dateFormat="YYYY-MM-DD"
                min="2021-04-05"
                placeholder={date}
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
