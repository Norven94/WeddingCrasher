import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/styled/Button";
import { Notification } from "../components/styled/Notification";
import { InputText } from "../components/styled/InputText";
import { Form } from "../components/styled/Form";
import {PageContainer} from "../components/styled/PageContainer";
import { useInput } from "../hooks/useInput";
import { resetPw } from "../api/routes/users";

const ResetPasswordPage = () => {
  const { value: email, set: setEmail, reset: resetEmail } = useInput("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await resetPw(email);
      resetEmail();
      setLoading(false);
      setMessage({ type: "success", text: "Reset email successfully sent" });
    } catch (e) {
      if (e.message.match(/user-not-found/)) {
        setMessage({
          type: "error",
          text: "Could not find any account with that email",
        });
        setLoading(false);
      }
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <h1>Forgot Password?</h1>
      <p>Please enter your email and we'll send you a reset email</p>
      <Form onSubmit={handleSubmit}>
        <div className="input-container">
          <InputText
            type="email"
            placeholder="Enter email"
            {...setEmail}
            required
          />
        </div>
        {message && (
          <Notification
          
            color={
              message.type === "error" ? "#FF9B9B" : "#9FD08D"
            }
          >
          {message.text}
          </Notification>
        )}
        <div className="mt-2 button-container">
          <Button
            className="mx-1 secondary"
            onClick={() => navigate("/login")}
          >Back</Button>
          <Button
            className={`${loading && "disabled"} mx-1`}
            disabled={loading}
            type="submit"
          >Send</Button>
        </div>
      </Form>
    </PageContainer>
  );
};

export default ResetPasswordPage;
