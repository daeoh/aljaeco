import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import testvideo from "../img/test.mp4";
import testvideo2 from "../img/test2.mp4";
import homebtn from "../img/house.png";

const Chapter = ({ title, sections, onSelectChapter, onSectionClick }) => (
  <div>
    <details>
      <summary onClick={() => onSelectChapter(0)}>{title}</summary>

      {sections.map((section, index) => (
        <p key={index} onClick={() => onSectionClick(section)}>
          {section.title}: {section.duration} 분
        </p>
      ))}
    </details>
  </div>
);

const TableOfContents = ({ chapters, onSelectChapter, onSectionClick }) => (
  <div>
    <h3>목차</h3>
    <ul>
      {chapters.map((chapter, index) => (
        <li key={index}>
          <Chapter
            title={chapter.title}
            sections={chapter.sections}
            onSelectChapter={() => onSelectChapter(index)}
            onSectionClick={onSectionClick}
          />
        </li>
      ))}
    </ul>
  </div>
);

const LecturePlay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lecture, setLecture] = useState({
    id: 1,
    title: "일타강사의 실전 자바-기본편",
    imgsrc:
      "https://cdn.inflearn.com/public/courses/332505/cover/96a78f3f-f0c9-412d-8297-d0852437b045/332505-eng.png",
    chapters: [
      {
        title: "Chapter 1: Hello world",
        sections: [
          {
            title: "개발 환경 설정",
            duration: 13,
            videoUrl: testvideo,
          },
          {
            title: "다운로드 소스 코드 실행 방법",
            duration: 3,
            videoUrl: testvideo2,
          },
          { title: "자바 프로그램 실행", duration: 11 },
          { title: "주석(comment)", duration: 4 },
          { title: "자바란?", duration: 0 },
        ],
      },
      {
        title: "Chapter 2: 변수",
        sections: [
          { title: "변수 시작", duration: 13 },
          { title: "변수 값 변경", duration: 3 },
          { title: "변수 선언과 초기화", duration: 12 },
          { title: "변수 타입1", duration: 8 },
          { title: "변수 타입2", duration: 15 },
          { title: "변수 명명 규칙", duration: 7 },
        ],
      },
    ],
  });

  const [selectedChapter, setSelectedChapter] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    setSelectedChapter(0);
  }, [id]);

  const goToMainPage = () => {
    navigate("/");
  };

  const onSectionClick = (section) => {
    // 섹션을 클릭할 때마다 동영상 변경
    setCurrentVideo(section.videoUrl);
  };

  return (
    <div style={{ display: "flex" }}>
      <button
        type="button"
        style={{ width: "50px", height: "40px", marginTop: "20px" }}
        onClick={goToMainPage}
      >
        <img
          src={homebtn}
          alt="Home"
          style={{ width: "30px", height: "30px" }}
        />
      </button>
      <div style={{ flex: 1 }}>
        <h2>{lecture.title}</h2>
        <img
          src={lecture.imgsrc}
          alt={lecture.title}
          style={{ width: "100%", paddingTop: "100px" }}
        />
        <div>
          {currentVideo && (
            <video controls width="100%" height="100%" src={currentVideo} />
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <button>previous</button>
          <button>next</button>
        </div>
      </div>

      <div style={{ width: "300px", marginLeft: "20px" }}>
        <TableOfContents
          chapters={lecture.chapters}
          onSelectChapter={(index) => setSelectedChapter(index)}
          onSectionClick={onSectionClick}
        />
      </div>
    </div>
  );
};

export default LecturePlay;
