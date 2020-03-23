import React from "react";
import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <div>
        <NavLink exact to="/login">
          <button> Login </button>
        </NavLink>
        {/* <NavLink exact to="/users">
          <button>Get Your List of Users </button>
        </NavLink> */}
      </div>
    </div>
  );
}

export default HomePage;
