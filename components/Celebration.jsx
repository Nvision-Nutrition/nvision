import React from 'react';
import {Modal, Button} from 'react-bootstrap';
// import useWindowSize from 'react-use/lib/useWindowSize';
// import Confetti from 'react-confetti';
import axios from 'axios';

const Celebration = ({ onHide }) => {
  const getSuccess = () => {
    axios.get('/api/success')
        .then((res) => {
          console.log('TESTING RES', res);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  // getSuccess();
  return (
    <>
      <Modal
        // {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          Beautifully done!
            {/* insert name if possible */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            You are doing so well, keep it up!
            {/* input data */}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Celebration;
