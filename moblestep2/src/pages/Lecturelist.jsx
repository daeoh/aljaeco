import React, { useState } from "react";
import Sidebar from "../components/sidebar";

const Lecturelist = () => {
  const [lecturelist, setLecturelist] = useState([
    {
      id: 1,
      imageSrc:
        "https://cdn.inflearn.com/public/courses/332506/cover/c58f00a0-181d-4b2e-a058-6c98a7dca47a/332506-eng.png",
      title: "일타강사의 실전 자바-기본편",
      rating: 3.8,
      price: "100000원",
    },
    {
      id: 2,
      imageSrc:
        "https://cdn.inflearn.com/public/courses/326674/cover/4657d793-56a4-42f3-9d44-dc88d125a49e",
      title: "스프링MVC편",
      rating: 4.2,
      price: "100000원",
    },
    {
      id: 3,
      imageSrc:
        "https://cdn.inflearn.com/public/courses/331324/cover/f09739a9-e3aa-4170-b630-6b9f58134c01/331324-eng.png",
      title: "Node.js 노드 빠르게 훑어보기:서버부터 DB까지",
      rating: 3.5,
      price: "100000원",
    },
    {
      id: 4,
      imageSrc:
        "https://cdn.inflearn.com/public/courses/324951/course_cover/510c265a-6de2-456d-8e6a-351b9ce29608/nodeReactbasic.png",
      title: "따라하며 배우는 노드,리액트 시리즈",
      rating: 3.3,
      price: "100000원",
    },
    {
      id: 5,
      imageSrc:
        "https://cdn.inflearn.com/public/courses/332506/cover/c58f00a0-181d-4b2e-a058-6c98a7dca47a/332506-eng.png",
      title: "일타강사의 실전 자바-기본편",
      rating: 4.4,
      price: "100000원",
    },
    {
      id: 6,
      imageSrc:
        "https://cdn.inflearn.com/public/courses/326674/cover/4657d793-56a4-42f3-9d44-dc88d125a49e",
      title: "스프링MVC편",
      rating: 3.5,
      price: "100000원",
    },
    {
      id: 7,
      imageSrc:
        "https://cdn.inflearn.com/public/courses/331324/cover/f09739a9-e3aa-4170-b630-6b9f58134c01/331324-eng.png",
      title: "Node.js 노드 빠르게 훑어보기:서버부터 DB까지",
      rating: 3.6,
      price: "100000원",
    },
    {
      id: 8,
      imageSrc:
        "https://cdn.inflearn.com/public/courses/324951/course_cover/510c265a-6de2-456d-8e6a-351b9ce29608/nodeReactbasic.png",
      title: "따라하며 배우는 노드,리액트 시리즈",
      rating: 4.8,
      price: "100000원",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const [filteredLectures, setFilteredLectures] = useState([]); // 검색 결과를 저장할 상태 추가

  // 검색 기능 구현 함수
  const handleSearch = () => {
    const filteredData = lecturelist.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLectures(filteredData);
  };

  // 검색어 업데이트 핸들러
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="lecturelist-container" style={{ display: "flex" }}>
      <Sidebar />
      <div className="content">
        <h2 style={{ paddingLeft: "50px" }}>전체 강의</h2>

        {/* 검색 입력 필드와 검색 버튼을 묶어서 오른쪽에 배치하고 크기 조정 */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end", // 오른쪽 정렬
            alignItems: "center", // 세로 중앙 정렬
            margin: "10px",
            width: "100%", // 부모 컨테이너에 맞게 폭 조정
          }}
        >
          <input
            type="text"
            placeholder="강의 검색..."
            value={searchTerm}
            onChange={handleSearchTermChange}
            style={{ margin: "10px", padding: "5px" }}
          />
          <button onClick={handleSearch} style={{ marginLeft: "10px" }}>
            검색
          </button>
        </div>

        <div className="img">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between", // 간격 벌리기
            }}
          >
            {/* 검색 결과에 따라 매핑할 데이터 변경 */}
            {(searchTerm ? filteredLectures : lecturelist).map((item) => (
              <div
                key={item.id}
                style={{
                  margin: "10px",
                  textAlign: "center",
                  width: "200px",
                  paddingTop: "30px",
                }}
              >
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  style={{ width: "100%", height: "120px", objectFit: "cover" }}
                />
                <p>{item.title}</p>
                <p>{item.rating}</p>
                <p>{item.price}</p>
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lecturelist;
