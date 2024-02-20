import React from "react";

const ForgotEmail = () => {
  // 여기에 ForgotEmail 페이지에서 필요한 기능을 추가할 수 있습니다.

  return (
    <div className="forgot-email">
      <h1>Forgot Email</h1>
      <p>Enter your registered email address to recover your account.</p>
      <form>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <button type="submit">Recover Account</button>
      </form>
    </div>
  );
};

export default ForgotEmail;
