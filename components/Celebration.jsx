import React, {useState, useEffect} from 'react';
import {Modal, Button} from 'react-bootstrap';
import Confetti from 'react-confetti';
import axios from 'axios';


const Celebration = ({show, onHide, name}) => {
  const [quote, setQuote] = useState('');
  const getSuccess = () => {
    axios.get('/api/success')
        .then((res) => {
          setQuote(res.data[0].success_quote);
        })
        .catch((err) => {
          console.error(err);
        });
  };

  useEffect(() => {
    getSuccess();
  }, []);
  return (
    <>
      {
        show &&
      <Confetti />
      }
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          Great job {name}!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {quote}
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
