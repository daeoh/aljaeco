import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = ({ isOpen, onClose, onMenuItemClick }) => {
  const menuItems = [
    "React",
    "Java",
    "Spring",
    "네트워크",
    "객체지향",
    "CI/CD",
    "Python",
    "SQL",
    "코딩테스트",
    "면접",
  ];

  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleMenuItemClick = (menuItem) => {
    // 메뉴 아이템 클릭에 대한 동작을 수행
    onMenuItemClick(menuItem);
    // 선택된 메뉴를 상태로 저장
    setSelectedMenu(menuItem);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul className="menu-list">
        {menuItems.map((item, index) => (
          <li key={index} onClick={() => handleMenuItemClick(item)}>
            {item}
            <hr />
          </li>
        ))}
      </ul>

      <div className="home">
        <div className="card-container">
          {selectedMenu === "React" && (
            <div className="card">
              <img
                className="card-image"
                src="https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png"
                alt="Course Image"
              />
              <div className="card-content">
                <h2 className="card-title">
                  The RED : 김민태의 React와 Redux로 구현하는 아키텍처와
                </h2>
                <p className="card-description">
                  프론트엔드 개발자는 언제든 리스크에 대응할 준비가 되어 있어야
                  합니다. 26년 실무 경험과...
                </p>
                <button className="card-button">Learn More</button>
              </div>
            </div>
          )}
          {/* Java, Spring 등 다른 메뉴에 대한 카드들도 유사하게 추가할 수 있습니다. */}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
