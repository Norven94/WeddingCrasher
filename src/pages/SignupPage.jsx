import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/styled/Button";
import { InputText } from "../components/styled/InputText";
import { Notification } from "../components/styled/Notification";
import { Form } from "../components/styled/Form";
import { PageContainer } from "../components/styled/PageContainer";
import { useInput } from "../hooks/useInput";
import { createUser } from "../api/routes/users";

const SignupPage = () => {
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
    setLoading(true);
    const result = await createUser(email, password);
    if (result.uid) {
      resetEmail();
      resetPassword();
      setLoading(false);
      navigate("/");
    } else if (result.match(/weak-password/)) {
      setErrorMessage("Password should be at least 6 characters!");
      setLoading(false);
    } else if (result.match(/invalid-email/)) {
      setErrorMessage("Email format not valid!");
      setLoading(false);
    } else if (result.match(/email-already-in-use/)) {
      setErrorMessage("Email is already taken!");
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <h1>Signup page</h1>
      <Form onSubmit={handleSubmit}>
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
        {errorMessage && (
          <Notification color="#FF9B9B">{errorMessage}</Notification>
        )}
        <div className="mt-2 button-container">
          <Button className="mx-1 secondary" onClick={() => navigate("/login")}>
            Back
          </Button>
          <Button
            className={`${loading && "disabled"} mx-1`}
            disabled={loading}
            type="submit"
          >
            Signup
          </Button>
        </div>
      </Form>
    </PageContainer>
  );
};

export default SignupPage;
