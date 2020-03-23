import React from "react";

function Login() {
  return (
    <div>
      <h3> Log In Here: </h3>

      <form>
        <label>
          Username: <br></br>
          <input
            type="text"
            name="username"
            placeholder="Please enter username"
            // value={}
            // onChange={}
          />
        </label>
        <br></br>
        <label>
          Password: <br></br>
          <input
            type="password"
            name="password"
            placeholder="Please enter Password"
            // value={}
            // onChange={}
          />
        </label>
        <br></br>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
