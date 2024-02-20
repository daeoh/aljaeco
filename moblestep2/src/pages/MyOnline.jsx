import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const MyOnline = () => {
  const { currentUser } = useContext(AuthContext);
  const [myonline, setMyonline] = useState([]);

  useEffect(() => {
    const mystudy = async () => {
      try {
        console.log(currentUser);
        const res = await axios.post(`/api/mypage/study`, {
          UserID: currentUser.UserID,
        });
        console.log(res.data.study);
        setMyonline(res.data.study);
      } catch (error) {
        console.error("강의 정보를 가져오는데 실패했습니다.", error);
      }
    };
    mystudy();
  }, []);

  return (
    <div className="MyOnline" style={{ height: "550px", display: "flex" }}>
      <div className="infonav">
        <ul
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            marginTop: "45px",
            paddingLeft: "0",
          }}
        >
          <li>
            <Link className="link" to={"/profile"}>
              내 정보
            </Link>
          </li>
          <br />
          <li>
            <Link className="link" to={"/myonline"}>
              수강 내역
            </Link>
          </li>
          <br />
          <li>
            <Link className="link" to={"/wishlist"}>
              찜 목록
            </Link>
          </li>
          <br />
          <li>
            <Link className="link" to={"/paymentlist"}>
              결제 내역
            </Link>
          </li>
          <br />
        </ul>
      </div>
      <div className="content">
        <h2>내 강의</h2>
        <div className="img">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {myonline.map((myonline) => (
              <div
                key={myonline.EnrollmentID}
                style={{
                  margin: "10px",
                  textAlign: "center",
                  width: "200px",
                }}
              >
                <img
                  src={myonline.LecturesImageURL}
                  alt={myonline.Title}
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
                <progress
                  id="progress"
                  value={myonline.Attendancerate}
                  max="100"
                ></progress>
                <p>{myonline.Title}</p>
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOnline;
