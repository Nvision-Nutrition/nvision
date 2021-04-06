import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Container, Modal, Row, Button,
} from 'react-bootstrap';
import axios from 'axios';
import NumPad from 'react-numpad';
import styles from '../styles/Home.module.css';

const InsertModals = ({show, type, handleClose}) => {
  const [meal, setMeal] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [val, setVal] = useState(0);

  const handleChange = (e) => {
    setMeal(e.target.value);
  };

  const addFood = (e) => {
    e.preventDefault();
    const foodEntry = {
      // default value for userId until global context is made avaliable
      userId: '1',
      mealType: 'food',
      calories: val,
      mealName: meal,
      usersDate: date,
    };
    if (val && meal && date) {
      axios.post('/api/addCalories', foodEntry)
          .then((res) => {
            console.log(res);
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
      userId: '1',
      water: val,
      usersDate: date,
    };
    if (val && date) {
      axios.post('/api/addWater', waterEntry)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.error(err);
          });
    } else {
      alert('Please complete entry');
    }
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
                  type === 'food' ? 'Meal Entry' :
                  'Water Entry'
              }
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            bsPrefix="entries-modal">
            {
              type === 'food' &&
                <select
                  value={meal}
                  className={`${styles.card} meal-select`}
                  onChange={handleChange}>
                  <option>Select a Meal</option>
                  <option value="breakfast">breakfast</option>
                  <option value="lunch">lunch</option>
                  <option value="dinner">dinner</option>
                  <option value="snack">snack</option>
                </select>
            }
            <Row>
              <NumPad.Number
                onChange={(value) => {
                  setVal(value);
                }}
                label={'Calories:'}
                value={val}
                decimal={2}
                className={`${styles.card} add-amount`}
              />
            </Row>
            <Row>
              <NumPad.Calendar
                onChange={(value) => {
                  setDate(value);
                }}
                label='Date:'
                dateFormat="YYYY-MM-DD"
                min="2021-04-05"
                value={date}
                className={`${styles.card} add-date`}
              />
            </Row>
            <Row>
              <Button
                variant="outline-secondary"
                onClick={
                  (e) => {
                    type === 'food' ? addFood(e) :
                    addWater(e);
                  }
                }>
                Record it!
              </Button>
            </Row>
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
