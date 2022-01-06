import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SuperButton from "../components/SuperButton";
import { useInput } from "../hooks/useInput";
import { loginUser } from '../api/routes/users'

const LoginPage = () => {
  const { value:email, set:setEmail, reset:resetEmail } = useInput('');
  const { value:password, set:setPassword, reset:resetPassword } = useInput('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await loginUser(email, password)
      resetEmail()
      resetPassword()
      navigate('/')
      setLoading(false)
    } catch (e) {
      if (e.message.match(/weak-password/)) {
        setErrorMessage("Password should be at least 6 characters!")
        setLoading(false)
      } else if (e.message.match(/invalid-email/)) {
        setErrorMessage("Email format not valid!")
        setLoading(false)
      } else if (e.message.match(/email-already-in-use/)) {
        setErrorMessage("Email is already taken!")
        setLoading(false)
      }
      console.log(e.message)
      setLoading(false)
    }
  }

  return (
    <div className="pageContainer">
      <h1>Login page</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="input-container">
          <input className="m-1" type="email" placeholder="Enter email" {...setEmail} required/>
          <input className="m-1" type="password" placeholder="Enter password" {...setPassword} required/>
        </div>
        <span className="error-message">{errorMessage && errorMessage}</span>
        <Link to="/reset">Forgot Password?</Link> 
        <div className="mt-2 button-container">
          <SuperButton className="mx-1 secondary" onClick={() => navigate('/signup')} title="Signup" />
          <SuperButton className={`${loading && "disabled"} mx-1`} title="Login" loading={loading} type="submit"/>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
