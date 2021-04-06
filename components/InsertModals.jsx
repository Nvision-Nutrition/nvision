import React, {useState, useContext} from 'react';
import {Context} from './globalState.js';
import PropTypes from 'prop-types';
import {
  Container, Modal, Row, Button, Form,
} from 'react-bootstrap';
import axios from 'axios';
import NumPad from 'react-numpad';

const InsertModals = ({show, type, handleClose}) => {
  const [meal, setMeal] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [displayDate, setDisplayDate] = useState(date.substring(5, 7).concat(
      '.', date.substring(8), '.', date.substring(2, 4)));
  const [val, setVal] = useState(0);
  const {userID} = useContext(Context);

  const handleChange = (e) => {
    setMeal(e.target.value);
  };

  const addFood = (e) => {
    e.preventDefault();
    const foodEntry = {
      // default value for userId until global context is made avaliable
      userId: userID,
      mealType: 'food',
      calories: val,
      mealName: meal,
      usersDate: date,
    };
    if (val && meal && date) {
      axios.post('/api/addCalories', foodEntry)
          .then((res) => {
            console.log(res);
            setVal(0);
            setMeal('Select a Meal');
          })
          .catch((err) => {
            console.error(err);
          });
    } else {
      alert('Please complete entry');
    }
  };

  const addWater = (e) => {
    e.preventDefault();
    const waterEntry = {
      // default value for userId until global context is made avaliable
      waterType: 'water',
      userId: userID,
      water: val,
      usersDate: date,
    };
    if (val && date) {
      axios.post('/api/addWater', waterEntry)
          .then((res) => {
            console.log(res);
            setVal(0);
          })
          .catch((err) => {
            console.error(err);
          });
    } else {
      alert('Please complete entry');
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
                  <div>
                    Water Entry <img src='/drop.png'
                      style={{
                        height: '20px',
                        width: '20px',
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
                <Form.Label>Water (oz)</Form.Label>
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
                  // const display = value.substring(5, 7).concat('.',
                  //     value.substring(8), '.', value.substring(2, 4));
                  // setDisplayDate(display);
                }}
                dateFormat="YYYY-MM-DD"
                min="2021-04-05"
                value={date}
                theme={myTheme}
              />
              <br/>
              <br/>
              <Button
                variant="outline-danger"
                onClick={
                  (e) => {
                    type === 'food' ? addFood(e) :
                    addWater(e);
                    handleClose();
                  }
                }>
                Record it!
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

InsertModals.propTypes = {
  // show: PropTypes.instanceOf(Boolean).isRequired,
  // type: PropTypes.instanceOf(String).isRequired,
  // handleClose: PropTypes.instanceOf(Function).isRequired,
};

export default InsertModals;
