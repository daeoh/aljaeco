import React, { useState } from "react";
import { Link } from "react-router-dom";

const Paymentlist = () => {
  const [paymentlist, setPaymentlist] = useState([
    {
      id: 1,
      paydate: "2020-06-21",
      title: "일타강사의 실전 java",
      price: "무료",
      attendancerate: "10.5",
    },
    {
      id: 2,
      paydate: "2020-06-21",
      title: "일타강사의 실전 java",
      price: "무료",
      attendancerate: "12.5",
    },
    {
      id: 3,
      paydate: "2010-06-21",
      title: "일타강사의 실전 java",
      price: "무료",
      attendancerate: "3.5",
    },
  ]);

  return (
    <div className="Paymentlist" style={{ height: "550px", display: "flex" }}>
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
      <div className="content" style={{ width: "100%" }}>
        <h2>결제 내역</h2>
        <div
          className="list"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center", // 가운데 정렬을 위해 추가
          }}
        >
          <table style={{ width: "100%", textAlign: "center" }}>
            <thead>
              <tr>
                <th scope="col">주문번호</th>
                <th scope="col">결제일</th>
                <th scope="col">강의명</th>
                <th scope="col">금액</th>
                <th scope="col">진도율</th>
              </tr>
            </thead>
            <tbody>
              {paymentlist.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.paydate}</td>
                  <td>{payment.title}</td>
                  <td>{payment.price}</td>
                  <td> {payment.attendancerate}</td>
                  <td>
                    <button disabled={payment.attendancerate >= 5}>환불</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Paymentlist;
