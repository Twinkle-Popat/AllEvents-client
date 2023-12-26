import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ onSubmit }) => {
  const navigate = useNavigate(); // Using useNavigate instead of useHistory
  const [issignup, setIssignup] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleToggleSignUp = () => {
    setIssignup(!issignup);
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    onSubmit({ inputs, signup: issignup });

    if (issignup) {
      // Redirect to login after signup
      navigate('/');
    } else {
      // Redirect to '/' after login
      navigate('/');
    }
  };
  return (
    <div className='p-4' style={{ border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h3 className='mb-4 text-center'>{issignup ? 'Sign Up' : 'Login'}</h3>
      <form onSubmit={handlesubmit}>
        {issignup && (
          <div className="form-outline mb-4">
            <input onChange={handleChange} value={inputs.name} type="text" id="name" className="form-control" />
            <label className="form-label" htmlFor="form2Example0">
              Name
            </label>
          </div>
        )}

        {/* Email input */}
        <div className="form-outline mb-4">
          <input onChange={handleChange} value={inputs.email} type="email" id="email" className="form-control" />
          <label className="form-label" htmlFor="form2Example1">
            Email address
          </label>
        </div>

        {/* Password input */}
        <div className="form-outline mb-4">
          <input onChange={handleChange} value={inputs.password} type="password" id="password" className="form-control" />
          <label className="form-label" htmlFor="form2Example2">
            Password
          </label>
        </div>

        {/* Toggle button based on issignup */}
        <button type="button" className="btn btn-primary btn-block" onClick={handlesubmit}>
          {issignup ? 'Sign Up' : 'Login'}
        </button>

        {/* Text at the end based on issignup */}
        <div className="text-center">
          <p>
            {issignup ? 'Already a user? ' : 'Not a member? '}
            <span style={{ cursor: 'pointer' }} onClick={handleToggleSignUp}>
             <a href="#">{issignup ? 'Login' : 'Register'}</a> 
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
