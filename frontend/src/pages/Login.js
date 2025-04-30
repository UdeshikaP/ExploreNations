import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(""); // To display error messages



  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5002/userAF/login', { email, password });
      localStorage.setItem('token', res.data.token); // store JWT
     
      toast.success("Logged in successfully! Welcome back.");
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      toast.warning("Incorrect email or password. Please try again.");
    }
  };

  return (
    
    <div className="login-container-p">
            <ToastContainer position="top-right" autoClose={3500} />

      <div className="welcome-container-p">
        <h1 className="welcome-heading-p">Welcome Back!</h1>
        <p className="welcome-message-p">
          Please enter your details to access your account
        </p>
      </div>
      <div className="login-modal-p">

        <div className="login-header-p">
          <h2>Login</h2>
        </div>
        <form className="login-form-p" onSubmit={handleLogin}>
          {error && <p className="error-message-p">{error}</p>}

          <div className="form-groupL-p">
            <label className="labelL-p" htmlFor="email">
              Email
            </label>
            <input
              className="inputL-p"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group password-group-p">
            <label className="labelL-p" htmlFor="password">
              Password
            </label>
            <div className="password-input-container-p">
              <input
                className="inputpwd-p"
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            </div>
          </div>
          <button type="submit" className="login-button-p">
            Login
          </button>
        </form>
      </div>

      <div className="signup-prompt-p">
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="signup-link-p">
            Sign up
          </Link>
        </p>
      </div>



    </div>
  );
};

export default Login;
