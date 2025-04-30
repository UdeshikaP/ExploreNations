import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5002/userAF/register', {
        username,
        email,
        password,
      });
      localStorage.setItem('token', res.data.token); // store JWT
      toast.success("Account created successfully! You can now log in."

);
            setTimeout(() => {
              navigate('/');
            }, 2000);
    } catch (err) {
      console.error(err);
      setError('Signup failed. Please try again.');
            toast.warning("Please check your details and try again.");
      
    }
  };

  return (
    <div className="login-container-p">
                  <ToastContainer position="top-right" autoClose={3500} />
      
      <div className="welcome-container-p">
        <h1 className="welcome-heading-p">Join Us!</h1>
        <p className="welcome-message">
          Create your account to get started
        </p>
      </div>

      <div className="login-modal-p">
        <div className="login-header-p">
          <h2>Sign Up</h2>
        </div>

        <form className="login-form-p" onSubmit={handleSignup}>
          {error && <p className="error-message-p">{error}</p>}

          <div className="form-groupL-p">
            <label className="labelL-p" htmlFor="username">
              Username
            </label>
            <input
              className="inputL-p"
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-groupL-p">
            <label className="labelL-p" htmlFor="email">
              Email
            </label>
            <input
              className="inputL-p"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
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
            Sign Up
          </button>
        </form>
      </div>

      <div className="signup-prompt-p">
        <p>
          Already have an account?{" "}
          <Link to="/login" className="signup-link-p">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
