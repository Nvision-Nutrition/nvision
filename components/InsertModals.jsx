import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Container, Modal, Button,
} from 'react-bootstrap';
// import axios from 'axios';
import NumPad from 'react-numpad';

const InsertModals = ({show, type, handleClose}) => {
  const [meal, setMeal] = useState('');

  const handleChange = (e) => {
    setMeal(e.target.value);
  };

  return (
    <>
      <Container>
        <div>
          <Modal
            show={show}
            onHide={handleClose}
          >
            <Modal.Header closeButton >
            </Modal.Header>
            <Modal.Body>
              {
                type === 'food' &&
                <select value={meal} onChange={handleChange}>
                  <option>Select a Meal</option>
                  <option value="breakfast">breakfast</option>
                  <option value="lunch">lunch</option>
                  <option value="dinner">dinner</option>
                  <option value="snack">snack</option>
                </select>
              }
              <NumPad.Number
                onChange={(value) => {
                  console.log('value', value);
                }}
                label={'Calories:'}
                placeholder={'my placeholder'}
                value={0}
                decimal={2}
              />
              <NumPad.Calendar
                onChange={(value) => console.log('changed', value)}
                label='Date:'
                dateFormat="DD-MM-YYYY"
                min="05-04-2021"
                markers={['05-04-2021', '05-04-2022']}
              />
              <Button
                variant="outline-secondary">
                Record it!
              </Button>
            </Modal.Body>
          </Modal>
        </div>
      </Container>
    </>
  );
};

InsertModals.propTypes = {
  show: PropTypes.instanceOf(Boolean).isRequired,
  type: PropTypes.instanceOf(String).isRequired,
  handleClose: PropTypes.instanceOf(Function).isRequired,
};

export default InsertModals;
