import React from 'react';
import {Modal, Button} from 'react-bootstrap';

const Failure = ({ onHide }) => {
  const getFailure = () => {
    axios.get('/api/fail')
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(res);
        });
  };
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
          It's okay!
            {/* insert name if possible */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
          Tomorrow is a new day!
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
