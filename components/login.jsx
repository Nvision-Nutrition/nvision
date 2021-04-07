import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';

const Login = () => {
  return (
    <Container
      style={{
        backgroundImage: `url("https://www.wud.qa/wp-content/uploads/2021/03/1894943316_SummerFruitsVeggies_Main_Updated.jpg.05e55ae84d0393baedd9c98e31d10fd2.jpg")`,
        backgroundRepeat: 'no-repeat',
        width: '90%',
        height: '500px',
        color: 'white',
        textAlign: 'center',
      }}>

      <Row>
        <Col>
          <h1
            style={{
              textShadow:
                '1px 0 0 #000, 0 -1px 0 #000,0 1px 0 #000, -1px 0 0 #000',
            }}>
            Login
          </h1>
        </Col>
      </Row>
      <Row>
      </Row>
    </Container>
  );
};

export default Login;
