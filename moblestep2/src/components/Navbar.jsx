import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import aljaeco from "../img/aljaeco.png";
import account from "../img/account.png";
import cart from "../img/cart.png";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="LinkList">
          <Link to="/">
            <img
              src={aljaeco}
              style={{ width: "200px", height: "60px" }}
              alt="Aljaeco"
            />
          </Link>
          <div>
            <Link className="link" to="/lecturelist">
              <h4>강의목록</h4>
            </Link>
          </div>
        </div>

        <div className="links">
          {currentUser ? (
            <>
              <button className="link" onClick={handleLogout}>
                로그아웃
              </button>
              <Link className="link" to="/cart">
                <img
                  src={cart}
                  alt="장바구니"
                  style={{ width: "24px", height: "24px" }}
                />
              </Link>
              <Link className="link" to="/profile">
                <img
                  src={account}
                  alt="프로필"
                  style={{ width: "24px", height: "24px" }}
                />
              </Link>
            </>
          ) : (
            <>
              <Link className="link" to="/login">
                <h6>로그인</h6>
              </Link>
              <Link className="link" to="/register">
                <h6>회원가입</h6>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
