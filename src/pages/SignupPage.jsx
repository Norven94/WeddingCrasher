import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuperButton from "../components/SuperButton";
import { useInput } from "../hooks/useInput";
import { createUser } from '../api/routes/users'

const SignupPage = () => {
  const { value:email, set:setEmail, reset:resetEmail } = useInput('');
  const { value:password, set:setPassword, reset:resetPassword } = useInput('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await createUser(email, password)
    if (result.uid) {
      resetEmail()
      resetPassword()
      setLoading(false)
      navigate('/')
    }
    else if (result.match(/weak-password/)) {
      setErrorMessage("Password should be at least 6 characters!")
      setLoading(false)
    } else if (result.match(/invalid-email/)) {
      setErrorMessage("Email format not valid!")
      setLoading(false)
    } else if (result.match(/email-already-in-use/)) {
      setErrorMessage("Email is already taken!")
      setLoading(false)
    } else {
      setLoading(false)
    }
  }
  

  return (
    <div className="pageContainer">
      <h1>Signup page</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="input-container">
          <input className="m-1" type="email" placeholder="Enter email" {...setEmail} required/>
          <input className="m-1" type="password" placeholder="Enter password" {...setPassword} required/>
        </div>
        <span className="error-message">{errorMessage && errorMessage}</span>
        <div className="mt-2 button-container">
          <SuperButton className="mx-1 secondary" onClick={() => navigate('/login')} title="Back"  />
          <SuperButton className={`${loading && "disabled"} mx-1`} title="Signup" loading={loading} type="submit"/>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
