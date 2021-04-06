import { FormGroup } from '@material-ui/core';
import React from 'react';
import {Col, Container, Form, Row, Image} from 'react-bootstrap';

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
        <Form>
          <FormGroup>
            
          </FormGroup>
        </Form>
      </Row>
    </Container>
    // <Container style={{width: '100%', display: 'inline-block', position: 'relative'}} >
    //   <Image scr="https://www.wud.qa/wp-content/uploads/2021/03/1894943316_SummerFruitsVeggies_Main_Updated.jpg.05e55ae84d0393baedd9c98e31d10fd2.jpg"/>
    // </Container>
  );
};

export default Login;
