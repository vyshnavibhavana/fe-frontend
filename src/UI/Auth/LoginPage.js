import React, { useContext, useRef, useState } from 'react';
// import '../App.css'; // Assuming you will create CSS styles in App.css
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Group from "../../images/Group.png"
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../Common/AppContext';
import { loginUser } from './AuthService';
import LeftPanel from '../../Common/LeftPanel';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';


function Login() {
  const toast = useRef(null);
  const [login, setLogin] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { globalData, setGlobalData } = useContext(AppContext);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    let json = login;
    json[name] = value;
    setLogin(json);
  }
  const handleClick = async () => {
    loginUser(login).then(
      async (result) => {
        console.log(result, "result");
        localStorage.setItem('user', JSON.stringify(result.data));
        navigate('/dashboard');
        await toast.current.show({ severity: 'success', detail: result.data.message });
      },
      (error) => {
        console.log(error);
        toast.current.show({ severity: 'error', detail: error.response.data.message });
      }
    );
  }
  const toggleEye = () => setShowPassword((prev) => !prev);
  return (
    <div className="d-flex">
      <Toast ref={toast} />
      {/* Left Side */}
      <LeftPanel />

      {/* Right Side */}
      <div className="right-panel">
        <div className="login-form">
          <h2>Login</h2>
          <div className="input-group d-flex justify-content-center align-items-center">
            <FaEnvelope className="icon" />
            <input type="email" name='email' placeholder="Email" required onChange={handleChange} />
          </div>
          <div className="input-group d-flex justify-content-center align-items-center">
            <FaLock className="icon" />
            <input type={showPassword ? 'text' : "password"} name='password' placeholder="Password" required onChange={handleChange} />
            <span onClick={toggleEye}>
              {showPassword ? <FaEyeSlash className="icon" /> :
                <FaEye className="icon" />}
            </span>
          </div>
          <button type="submit" className="login-button" onClick={handleClick}>Log in</button>

          <div className="register">
            <span>Have no account yet?</span>
            {/* <Link to="register" className="register-link">Register</Link> */}
          </div>
          <Button label="Register" onClick={() => navigate('/auth/register')} outlined style={{ width: '100%', borderRadius: '25px', marginTop: '15px' }} />
        </div>
      </div>
    </div>
  );
}

export default Login;
