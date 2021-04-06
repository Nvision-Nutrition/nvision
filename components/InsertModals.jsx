import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Container, Modal, Row, Button, Form,
} from 'react-bootstrap';
import axios from 'axios';
import NumPad from 'react-numpad';

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
      userId: '1',
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
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'calc(1.5em + .75rem + 2px)',
                  padding: '.375rem .75rem',
                  // fontSize: 1rem;
                  // fontWeight: 400;
                  // lineHeight: 1.5;
                  color: 'red',
                  backgroundColor: 'red',
                  // backgroundClip: padding-box;
                  // border: 1px solid #ced4da;
                  // borderRadius: .25rem;
                  // transition: borderColor .15s ease-in-out,box-shadow .15s ease-in-out;
                }}
                position='center'
                value={val}
                decimal={2}
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
                value={date}
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
