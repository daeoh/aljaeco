import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isUsernameChecked, setIsUsernameChecked] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailChecked(false);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setIsUsernameChecked(false);
  };

  const handleEmailCheck = () => {
    if (email === "ex@email.com") {
      setIsEmailChecked(false);
    } else {
      setIsEmailChecked(true);
    }
  };

  const handleUsernameCheck = () => {
    if (username === "test") {
      setIsUsernameChecked(false);
    } else {
      setIsUsernameChecked(true);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = () => {
    // 회원가입 로직 구현
  };

  return (
    <div className="auth">
      <h1>알재코</h1>
      <form>
        <div className="input-group">
          <label>
            이메일
            <input
              required
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={handleEmailChange}
            />
            <button type="button" onClick={handleEmailCheck}>
              중복
            </button>
          </label>
          <br />
          {isEmailChecked && <span>사용 가능한 이메일입니다.</span>}
        </div>

        <div className="input-group">
          <label>
            이름
            <input
              required
              type="text"
              placeholder="이름을 입력하세요"
              value={username}
              onChange={handleUsernameChange}
            />
            <button type="button" onClick={handleUsernameCheck}>
              중복
            </button>
          </label>
          <br />
          {isUsernameChecked && <span>사용 가능한 닉네임입니다.</span>}
        </div>

        <div className="input-group">
          <label>
            비밀번호
            <input
              required
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>

        <div className="input-group">
          <label>
            비밀번호 확인
            <input
              required
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </label>
        </div>

        <button type="button" onClick={handleRegister}>
          Register
        </button>
        <p>This is an error!</p>
        <span>
          Don't you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
