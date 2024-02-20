import React, { useRef, useState } from "react";
import { Link, Routes, Route, useParams } from "react-router-dom"; // Routes와 useParams 추가
import testvideo from "../img/test.mp4";
import testvideo2 from "../img/test2.mp4";

const ChapterDetail = ({ chapters }) => {
  const { chapterId } = useParams();
  const chapter = chapters[chapterId];

  return (
    <div>
      <h2>{chapter.title}</h2>
      {chapter.video && (
        <video controls>
          <source src={chapter.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <p>{chapter.content}</p>
    </div>
  );
};

const Detail = () => {
  const imageSrc =
    "https://cdn.inflearn.com/public/courses/332506/cover/c58f00a0-181d-4b2e-a058-6c98a7dca47a/332506-eng.png";
  const numStudents = 22615;
  const courseTitle = "스프링 MVC 1편- 백엔드 웹 개발 핵심 기술";
  const numReviews = 1729;
  const category = "백엔드";
  const price = 69300;

  const [isFavorite, setIsFavorite] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  const handleAddToCart = () => {
    console.log("장바구니에 추가되었습니다.");
  };

  const handleCheckout = () => {
    console.log("결제하기 버튼이 클릭되었습니다.");
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const renderStar = () => {
    return isFavorite ? "⭐️" : "☆";
  };

  const instructorSectionRef = useRef(null);
  const reviewsSectionRef = useRef(null);
  const curriculumSectionRef = useRef(null);

  const handleScrollToInstructor = () => {
    if (instructorSectionRef.current) {
      instructorSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToCurriculum = () => {
    if (curriculumSectionRef.current) {
      curriculumSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToReviews = () => {
    if (reviewsSectionRef.current) {
      reviewsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleReviewSubmit = () => {
    if (reviewText.trim() !== "") {
      const newReview = {
        id: reviews.length + 1,
        date: new Date().toLocaleDateString(),
        nickname: "수강생",
        text: reviewText,
        // views: 0,
      };
      setReviews([...reviews, newReview]);
      setReviewText("");
    }
  };

  const handleReviewDelete = (reviewId) => {
    setReviews(reviews.filter((review) => review.id !== reviewId));
  };

  const chapters = [
    {
      title: "Chapter 1: Introduction",
      content: "Introduction to the course...",
      video: testvideo,
    },
    {
      title: "Chapter 2: Basics",
      content: "Basics of the course...",
      video: testvideo2,
    },
    {
      title: "Chapter 3: Basics",
      content: "Basics of the course...",
    },
    {
      title: "Chapter 4: Basics",
      content: "Basics of the course...",
    },
  ];

  return (
    <div className="app-container">
      <div className="box-container">
        <div className="course-details">
          <div className="image-container">
            <img src={imageSrc} alt="Course Image" />
          </div>
          <div className="course-info">
            <p style={{ textAlign: "center" }}>{category}</p>
            <h1>{courseTitle}</h1>
            <div
              className="info-row"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <p>{numReviews}개의 수강평</p>
              <p style={{ marginRight: "10px" }}>{numStudents}명의 수강생</p>
            </div>
            <p>가격: {price.toLocaleString()}원</p>
          </div>

          <div className="action-buttons">
            <button onClick={handleAddToCart}>장바구니</button>
            <button onClick={handleCheckout}>결제하기</button>
          </div>
          <div className="favorite-button">
            <button onClick={handleToggleFavorite}>{renderStar()}</button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="nav-buttons">
        <button onClick={handleScrollToInstructor}>강의소개</button>
        <button onClick={handleScrollToCurriculum}>커리큘럼</button>
        <button onClick={handleScrollToReviews}>수강평</button>
      </div>

      <div
        id="instructor-section"
        ref={instructorSectionRef}
        className="instructor-section"
      >
        <hr></hr>
        <h1>강의소개</h1>
        <div
          style={{
            backgroundColor: "#f2f2f2",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <p>
            초급자를 위해 준비한 <br></br> [백엔드, 웹 개발] 강의입니다.
          </p>
          <p>
            웹 애플리케이션을 개발할 때 필요한 모든 웹 기술을 기초부터 이해하고,
            완성할 수 있습니다. 스프링 MVC의 핵심 원리와 구조를 이해하고, 더
            깊이있는 백엔드 개발자로 성장할 수 있습니다.
          </p>
          <br></br>
        </div>

        <h2>강의 목표</h2>
        {/* 회색 네모 박스 */}
        <div
          style={{
            backgroundColor: "#f2f2f2",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          {/* 네모 안에 텍스트 */}
          <p>웹 개발 기술 이해</p>
          <p>스프링 MVC 핵심 원리 이해</p>
          <p>
            목표: 실무 백엔드 웹 애플리케이션을 개발할 때 필요한 모든 웹 기술을
            완성하는 것이 이 강의의 목표입니다.
          </p>
          <p>
            웹 기초부터 실무까지: 실무 개발을 위한 내용이 많지만, 웹
            애플리케이션 개발 경험이 없는 개발자도 적응할 수 있게 단계적으로
            구성하였습니다.
          </p>
          <p>
            자바 웹 기술 이야기: 서블릿, JSP 처럼 자바 기본 웹 기술부터 시작해서
            왜? 스프링 MVC가 나오게 되었는지를 설명합니다.
          </p>
          <p>
            실무 예제 중심: 실무에서 스프링으로 웹 애플리케이션을 개발할 때
            필요한 모든 과정을 예제를 통해 자연스럽게 학습하며, 실무 베스트
            프랙티스를 전수해드립니다.
          </p>
          <p>
            간결함: 실무에서 사용하지 않는 오래된 스프링 MVC 기능은 과감하게
            제외했습니다. 최신 실무에 주로 사용하는 내용 중심으로 설명합니다.
          </p>

          {/* 필요한 목표를 추가할 수 있습니다. */}
        </div>

        <h2>강사 소개</h2>
        {/* 회색 네모 박스 */}
        <div
          style={{
            backgroundColor: "#f2f2f2",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          {/* 네모 안에 텍스트 */}
          <p>뽀로로 선생님</p>
          <p>서울대 졸업</p>

          {/* 필요한 목표를 추가할 수 있습니다. */}
        </div>

        <h2>난이도</h2>
        {/* 회색 네모 박스 */}
        <div>
          <p>난이도:</p>
          {[...Array(3)].map((_, index) => (
            <span key={index}>⭐️</span>
          ))}
        </div>
        <br></br>
        <hr></hr>
      </div>

      {/* 커리큘럼 섹션 */}
      <div
        id="curriculum-section"
        ref={curriculumSectionRef}
        className="curriculum-section"
      >
        {/* 커리큘럼 내용 */}
        <h2>커리큘럼</h2>
        <ul>
          {chapters.map((chapter, index) => (
            <li key={index}>
              {/* Link를 수정하여 해당 챕터의 chapterId를 전달 */}
              <Link to={`/chapter/${index}`}>{chapter.title}</Link>
            </li>
          ))}
        </ul>
        <br></br>
        <hr></hr>
      </div>

      {/* 수강평 섹션 */}
      <h2>수강평</h2>
      <div
        id="reviews-section"
        ref={reviewsSectionRef}
        className="reviews-section"
      >
        <h2>수강평 작성</h2>
        <textarea value={reviewText} onChange={handleReviewChange} />
        <button onClick={handleReviewSubmit}>등록</button>

        <h2>수강평 목록</h2>
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>날짜: {review.date}</p>
              <p>닉네임: {review.nickname}</p>
              {/* <p>조회수: {review.views}</p> */}
              <p>{review.text}</p>
              <button onClick={() => handleReviewDelete(review.id)}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Routes>
        <Route
          path="/chapter/:chapterId"
          element={<ChapterDetail chapters={chapters} />}
        />
      </Routes>
    </div>
  );
};

export default Detail;
