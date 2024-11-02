import { useContext, useRef, useState } from "react";
import LeftPanel from "../../Common/LeftPanel"
import { AppContext } from "../../Common/AppContext";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa6";
import { registerUser } from "./AuthService";
import { Toast } from "primereact/toast";

const Register = () => {
    const toast = useRef(null);
    const [register, setRegister] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const history = useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target;
        let json = register;
        json[name] = value;
        console.log(json, 'json');
        setRegister(json);
    }
    const handleClick = async () => {
        registerUser(register).then(
            async (result) => {
                console.log(result.data, 'result')
                await toast.current.show({ severity: 'success', detail: 'Message Content' });
                history('/auth/login');
            },
            (error) => {
                console.log(error, 'error')
                toast.current.show({ severity: 'error', detail: error.response.data.message || error.message });
            }
        );
    }
    const toggleEyeForConfirm = () => setShowPasswordConfirm((prev) => !prev);
    const toggleEye = () => setShowPassword((prev) => !prev);
    return (
        <div className="d-flex">
            <Toast ref={toast} />
            <LeftPanel />
            <div className="right-panel">
                <div className="login-form">
                    <h2>Register</h2>
                    <div className="input-group d-flex justify-content-center align-items-center">
                        <FaUser className="icon" />
                        <input type="name" name='username' placeholder="Name" required onChange={handleChange} />
                    </div>
                    <div className="input-group d-flex justify-content-center align-items-center">
                        <FaEnvelope className="icon" />
                        <input type="email" name='email' placeholder="Email" required onChange={handleChange} />
                    </div>
                    <div className="input-group d-flex justify-content-center align-items-center">
                        <FaLock className="icon" />
                        <input type={showPassword ? 'text' : "password"} name='createPassword' placeholder="Create Password" required onChange={handleChange} />
                        <span onClick={toggleEye}>
                            {showPassword ? <FaEyeSlash className="icon" /> :
                                <FaEye className="icon" />}
                        </span>
                    </div>
                    <div className="input-group d-flex justify-content-center align-items-center">
                        <FaLock className="icon" />
                        <input type={showPasswordConfirm ? 'text' : "password"} name='password' placeholder="Confirm Password" required onChange={handleChange} />
                        <span onClick={toggleEyeForConfirm}>
                            {showPasswordConfirm ? <FaEyeSlash className="icon" /> :
                                <FaEye className="icon" />}
                        </span>
                    </div>
                    <button type="submit" className="login-button" onClick={handleClick}>Log in</button>

                    <div className="register">
                        <span>Have an account</span>
                        <Link to="login" className="register-link">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;