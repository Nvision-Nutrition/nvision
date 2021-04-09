import React, {useState} from 'react';
import axios from 'axios';
import {Container, Form, Button} from 'react-bootstrap';


const SignUp = ({setSignup}) => {
  const [state, setState] = useState({
    // added to prevent warning component is
    // changing an uncontrolled input to be controlled
    // select form initial option is male so setting state to match
    firstName: '',
    lastName: '',
    password1: '',
    password2: '',
    calorieGoal: '',
    waterGoal: '',
    weightGoal: '',
    phone: '',
    email: '',
    sex: 'male',
  });

  const handleChange = (e) => {
    // combine the current obj with new state property or set old one
    setState({...state, [e.target.name]: e.target.value});
  };


  const submitUser = () => {
    // check that data is there
    if (!state.firstName || !state.lastName || !state.password1 ||
        !state.calorieGoal || !state.waterGoal||
        !state.weightGoal || !state.phone || !state.email) {
      alert('Please make sure you have filled out all fields.');
      return;
    } else if (state.password1 !== state.password2) {
      alert('Passwords don\'t match');
      return;
    } else if (state.phone.length !== 10 ||
      typeof Number(state.phone) !== 'number') {
      alert('Phone number is incorrect');
    } else if (!state.email.includes('@') || !state.email.includes('.com')) {
      alert('please enter a valid email');
    } else {
      // if it looks good submit to api
      axios({
        method: 'POST',
        url: 'api/newUser',
        data: state,
      })
          .then((result) => {
            alert('Account creation successful!');
            setSignup(false);
          })
          .catch((err) => {
            console.error(err);
            alert('Sign up unsuccessful: '+
            'someone has already taken this username.');
          });
    }
  };

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
          <Form.Control
            placeholder="Enter first name"
            onChange={handleChange}
            name="firstName"
            value={state.firstName}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            placeholder="Enter last name"
            onChange={handleChange}
            name="lastName"
            value={state.lastName}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password1"
            value={state.password1}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password Again</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password2"
            value={state.password2}
          />
        </Form.Group>


        <Form.Group>
          <Form.Label>Daily Calorie Limit</Form.Label>
          <Form.Control
            placeholder="Enter calorie goal"
            onChange={handleChange}
            name='calorieGoal'
            value={state.calorieGoal}
          />
        </Form.Group>


        <Form.Group>
          <Form.Label>Daily Water Goal</Form.Label>
          <Form.Control
            placeholder="Enter water goal"
            onChange={handleChange}
            name="waterGoal"
            value={state.waterGoal}
          />
          <Form.Text className="text-muted">
            in ounces (oz)
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Target Weight</Form.Label>
          <Form.Control
            placeholder="Enter target weight"
            onChange={handleChange}
            name="weightGoal"
            value={state.weightGoal}
          />
          <Form.Text className="text-muted">
            in pounds (lbs)
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            placeholder="Enter phone number"
            onChange={handleChange}
            name="phone"
            value={state.phone}
          />
          <Form.Text className="text-muted">
            Format: 1234567890
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
            name="email"
            value={state.email}
          />
          <Form.Text className="text-muted">
            {'We\'ll never share your email with anyone else.'}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Sex</Form.Label>
          <Form.Control
            as="select"
            onChange={handleChange}
            name="sex"
            value={state.sex}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Prefer not to disclose</option>
          </Form.Control>
          <Form.Text className="text-muted">
            Assigned at birth.
          </Form.Text>
        </Form.Group>

        <Button
          variant="primary"
          type="button"
          onClick={submitUser}
        >Submit
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
