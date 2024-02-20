import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 여기에서 이메일을 서버로 전송하고 비밀번호 재설정 링크를 생성 및 전송하는 로직을 추가하세요.
    // 실제 서버와 통신하거나 이메일을 보내는 기능은 서버 사이드에서 이루어져야 합니다.

    // 임시로 메시지를 설정합니다.
    setMessage(`Password reset link has been sent to ${email}`);
  };

  return (
    <div className="auth">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <button type="submit">Reset Password</button>
        {message && <p>{message}</p>}
        <span>
          Remember your password? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default ForgotPassword;
