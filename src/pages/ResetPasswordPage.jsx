import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuperButton from "../components/SuperButton";
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
    <div className="pageContainer">
      <h1>Forgot Password?</h1>
      <p>Please enter your email and we'll send you a reset email</p>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="email"
            placeholder="Enter email"
            {...setEmail}
            required
          />
        </div>
        <span
          className={
            message.type === "error" ? "error-message" : "success-message"
          }
        >
          {message && message.text}
        </span>
        <div className="mt-2 button-container">
          <SuperButton
            className="mx-1 secondary"
            onClick={() => navigate("/login")}
            title="Back"
          />
          <SuperButton
            className={`${loading && "disabled"} mx-1`}
            title="Send"
            loading={loading}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
