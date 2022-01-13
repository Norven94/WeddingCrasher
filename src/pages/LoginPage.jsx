import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/styled/Button";
import { InputText } from "../components/styled/InputText";
import { Notification } from "../components/styled/Notification";
import { Form } from "../components/styled/Form";
import { PageContainer } from "../components/styled/PageContainer";
import { useInput } from "../hooks/useInput";
import { loginUser } from "../api/routes/users";

const LoginPage = () => {
  const { value: email, set: setEmail, reset: resetEmail } = useInput("");
  const {
    value: password,
    set: setPassword,
    reset: resetPassword,
  } = useInput("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await loginUser(email, password);
      resetEmail();
      resetPassword();
      navigate("/");
      setLoading(false);
    } catch (e) {
      console.log(e.message);
      if (e.message.match(/user-not-found/)) {
        setErrorMessage("We can not find any user with that email");
        setLoading(false);
      } else if (e.message.match(/wrong-password/)) {
        setErrorMessage("You entered wrong password");
        setLoading(false);
      }
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <h1>Login page</h1>
      <Form onSubmit={handleSubmit}>
        {errorMessage && (
          <Notification color="#FF9B9B">{errorMessage}</Notification>
        )}
        <div className="input-container">
          <InputText
            className="m-1"
            type="email"
            placeholder="Enter email"
            {...setEmail}
            required
          />
          <InputText
            className="m-1"
            type="password"
            placeholder="Enter password"
            {...setPassword}
            required
          />
        </div>
        <Link to="/reset">Forgot Password?</Link>
        <div className="mt-2 button-container">
          <Button
            className="mx-1 secondary"
            onClick={() => navigate("/signup")}
          >
            Signup
          </Button>
          <Button
            className={`${loading && "disabled"} mx-1`}
            disabled={loading}
            type="submit"
          >
            Login
          </Button>
        </div>
      </Form>
    </PageContainer>
  );
};

export default LoginPage;
