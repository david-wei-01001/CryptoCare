import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  console.log("hello")
  return (
    <div className="Login">
      <p>Don't have an account?<Link to="/register">Sign up</Link></p>
    </div>
  );
}

export default Login;
