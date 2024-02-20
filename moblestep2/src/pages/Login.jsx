import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      useremail: email,
      password: password,
    };
    await login(userData);
    navigate("/");
  };
  return (
    <div className="auth">
      <h1>로그인</h1>
      <form>
        <input
          type="text"
          placeholder="이메일"
          name="useremail"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="비밀번호"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button onClick={handleSubmit}>Login</button>
        <div className="links-container">
          <span>
            <Link to="/register">회원가입</Link>
          </span>
          <span>
            <Link to="/forgot-email">이메일 찾기</Link>
          </span>
          <span>
            <Link to="/forgot-password">비밀번호 찾기</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
