/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from 'react';
import {Modal, Button} from 'react-bootstrap';
import axios from 'axios';

const Failure = ({ show, onHide, name }) => {
  const [motivation, setMotivation] = useState('');
  const getFailure = () => {
    axios.get('/api/fail')
        .then((res) => {
          setMotivation(res.data[0].failure_quote);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  useEffect(() => {
    getFailure();
  }, []);
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="fail-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          It's okay {name}!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {motivation}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Failure;
