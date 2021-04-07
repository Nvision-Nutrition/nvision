import React from 'react';
import {Container, Form, Button} from 'react-bootstrap';


const SignUp = () => {
  return (
    <Container style={{
      margin: '5%',
    }}>
      <h1 style={{
        textAlign: 'center',
      }}>Sign Up</h1>
      <Form>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control placeholder="Enter first name" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control placeholder="Enter last name" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Enter username" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password Again</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>


        <Form.Group>
          <Form.Label>Calorie Goal</Form.Label>
          <Form.Control placeholder="Enter username" />
        </Form.Group>


        <Form.Group>
          <Form.Label>Water Goal</Form.Label>
          <Form.Control placeholder="Enter username" />
        </Form.Group>

        {/*
        <Form.Group>
          <Form.Label>Weight Goal</Form.Label>
          <Form.Control placeholder="Enter username" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Current Weight</Form.Label>
          <Form.Control placeholder="Enter username" />
        </Form.Group> */}

        <Form.Group>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control placeholder="Enter username" />
          <Form.Text className="text-muted">
            Format: 1234567890
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Sex</Form.Label>
          <Form.Control as="select">
            <option>Male</option>
            <option>Female</option>
            <option>Prefer not to disclose</option>
          </Form.Control>
          <Form.Text className="text-muted">
            Assigned at birth.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Container>
    // <div id="signUpDiv" style={{'textAlign': 'center'}}>
    //   <h1>Sign Up</h1>
    //   <form>
    //     <label>First Name</label>
    //     <br />
    //     <input type="text"></input>
    //     <br />
    //     <label>Last Name</label>
    //     <br />
    //     <input type="text"></input>
    //     <br />
    //     <label>Username</label>
    //     <br />
    //     <input type="text"></input>
    //     <br />
    //     <label>Password</label>
    //     <br />
    //     <input type="text"></input>
    //     <br />
    //     <label>Password again</label>
    //     <br />
    //     <input type="text"></input>
    //     <br />
    //     <label>Calorie Goal</label>
    //     <br />
    //     <input type="text"></input>
    //     <br />
    //     <label>Water Goal (ounces)</label>
    //     <br />
    //     <input type="text"></input>
    //     <br />
    //     <label>Weight Goal</label>
    //     <br />
    //     <input type="text"></input>
    //     <br />
    //     <label>Phone number</label>
    //     <br />
    //     <input type="number"></input>
    //     <br />
    //     <label>Email</label>
    //     <br />
    //     <input type="text"></input>
    //     <br />
    //     <label>Sex(assigned at birth)</label>
    //     <br />
    //     <select style={{'width': '100%'}}>
    //       <option>Male</option>
    //       <option>Female</option>
    //       <option>Choose not to disclose</option>
    //     </select>
    //     <br />
    //     <br />
    //     <input
    //       type="submit"
    //       style={{'width': '100%', 'height': '50px'}} >
    //     </input>
    //   </form>
    //   <br />
    //   <button style={{'width': '100%', 'height': '50px'}}>Login</button>
    // </div>
  );
};

export default SignUp;
