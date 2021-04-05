import React from 'react';

const SignUp = () => {
  return (
    <div id="signUpDiv" style={{'textAlign': 'center'}}>
      <h1>Sign Up</h1>
      <form>
        <label>First Name</label>
        <br />
        <input type="text"></input>
        <br />
        <label>Last Name</label>
        <br />
        <input type="text"></input>
        <br />
        <label>Username</label>
        <br />
        <input type="text"></input>
        <br />
        <label>Password</label>
        <br />
        <input type="text"></input>
        <br />
        <label>Password again</label>
        <br />
        <input type="text"></input>
        <br />
        <label>Calorie Goal</label>
        <br />
        <input type="text"></input>
        <br />
        <label>Water Goal (ounces)</label>
        <br />
        <input type="text"></input>
        <br />
        <label>Weight Goal</label>
        <br />
        <input type="text"></input>
        <br />
        <label>Phone number</label>
        <br />
        <input type="number"></input>
        <br />
        <label>Email</label>
        <br />
        <input type="text"></input>
        <br />
        <label>Sex</label>
        <br />
        <select style={{'width': '100%'}}>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <br />
        <br />
        <input
          type="submit"
          style={{'width': '100%', 'height': '50px'}} >
        </input>
      </form>
      <br />
      <button style={{'width': '100%', 'height': '50px'}}>Login</button>
    </div>
  );
};

export default SignUp;
