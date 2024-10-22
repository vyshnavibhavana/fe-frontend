import React from 'react';
// import '../App.css'; // Assuming you will create CSS styles in App.css
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Group from "../images/Group.png"

function App() {
  return (
    <div className="container">
      {/* Left Side */}
      <div className="left-panel">
        <img
          src={Group} // Replace with actual image source
          alt="Robot Welcoming"
          className="robot-image"
        />
        <h1>Welcome aboard my friend</h1>
        <p>Just a couple of clicks and we start</p>
      </div>

      {/* Right Side */}
      <div className="right-panel">
        <form className="login-form">
          <h2>Login</h2>
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input type="email" placeholder="Email" required />
          </div>
          <div className="input-group">
            <FaLock className="icon" />
            <input type="password" placeholder="Password" required />
          </div>
          <button type="submit" className="login-button">Log in</button>

          <div className="register">
            <span>Have no account yet?</span>
            <a href="#register" className="register-link">Register</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
