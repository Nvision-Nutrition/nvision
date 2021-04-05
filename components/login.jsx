import React from 'react';

const Login = () => {
  return (
    <div id="loginDiv" style={{'text-align': 'center'}} >
      <h1>Login</h1>
      <form>
        <label>Email </label>
        <br />
        <input type="text" ></input>
        <br />
        <label>Password </label>
        <br />
        <input type="text" ></input>
        <br />
        <br />
        <input
          type="submit"
          style={{'width': '100%', 'height': '50px'}} >
        </input>
      </form>
      <br />
      <button style={{'width': '100%', 'height': '50px'}}>Sign Up</button>
    </div>
  );
};

export default Login;
