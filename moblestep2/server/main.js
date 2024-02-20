const express = require("express");
const app = express();
const db = require("./mysql");
const port = 3001;
app.use(express.json());
console.log("Hello world!!");

app.get("/test", (req, res) => {
  db.query("SELECT * FROM Users;", (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Data retrieved:", rows);
      res.send(rows);
    }
  });
});

//메인페이지(로그인X)
app.get("/api", (req, res) => {
  db.query(
    `SELECT
		l.LectureID as LectureID,
		l.Title as Title,
		l.LecturesImageUrl as LecturesImageUrl,
		l.LecturePrice as LecturePrice,
		i.INSTRUCTORNAME as INSTRUCTORNAME,
		avg(c.RATING) AS RATINGAVERAGE  ,
		count(c.COMMENTID) AS Countcomment,
		l.UPLOADDATE 
	FROM
		LECTURES l
	JOIN INSTRUCTOR i ON
		l.INSTRUCTORID = i.INSTRUCTORID
	JOIN COMMENTS c ON
		l.LECTUREID = c.LECTUREID
	GROUP BY
		l.LectureID,
      l.Title,
      l.LecturesImageUrl,
      l.LecturePrice,
      i.INSTRUCTORNAME,
      l.UPLOADDATE
	ORDER BY
		l.UPLOADDATE DESC
	LIMIT 5 ;`,
    (err, newlist) => {
      if (err) {
        console.log(err);
        res.status(500).send("해당하는 페이지가 존재하지 않습니다.");
      } else {
        console.log("불러오기 성공");
      }
      db.query(
        `SELECT l.Title,l.LecturesImageUrl,l.LecturePrice,i.INSTRUCTORNAME ,
	      avg(c.RATING) AS RATINGAVERAGE  ,count(c.COMMENTID) AS Countcomment
        FROM LECTURES l
        JOIN INSTRUCTOR i ON
	      l.INSTRUCTORID = i.INSTRUCTORID
        JOIN COMMENTS c ON
	      l.LECTUREID = c.LECTUREID
        GROUP BY
          l.TITLE ,
          l.LECTURESIMAGEURL ,
          l.LECTUREPRICE ,
          i.INSTRUCTORNAME 
        ORDER BY
          RATINGAVERAGE  DESC
        LIMIT 5;`,
        (err, hotlist) => {
          if (err) {
            console.log(err);
            res.status(500).send("해당하는 페이지가 존재하지 않습니다.");
          } else {
            if (!res.headersSent) {
              res.json({
                code: "200",
                message: "success",
                hotlist: hotlist,
                newlist: newlist,
              });
            }
          }
        }
      );
    }
  );
});

//회원가입
app.post("/api/signup", (req, res) => {
  const id = req.body.UserID;
  const name = req.body.username;
  const email = req.body.useremail;
  const cellphone = req.body.usercellphone;
  const password = req.body.password;
  const sql = `INSERT INTO USERS (UserID,username,useremail,usercellphone,password,usertype) VALUES (?,?,?,?,?,"student");`;
  const values = [id, name, email, cellphone, password];

  db.query(sql, values, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("잘못된 요청입니다.");
    } else {
      console.log("signup:", rows);
      if (!res.headersSent) {
        res.send("회원가입이 완료되었습니다.");
      }
    }
  });
});

//로그인
app.post("/api/login", (req, res) => {
  const email = req.body.useremail;
  const password = req.body.password;
  console.log("이메일:", email);
  console.log("비밀번호:", password);
  const sql = `SELECT u.useremail as email ,u.PASSWORD,u.UserID
              FROM USERS u
              WHERE u.USEREMAIL =? AND u.PASSWORD =? ;`;
  const values = [email, password];
  db.query(sql, values, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("로그인 실패");
    } else {
      console.log("login", rows);
      if (rows.length === 0) {
        res.status(401).json({
          code: "401",
          message: "로그인 실패",
        });
      } else {
        res.json({
          code: "200",
          message: "로그인 성공",
          userinfo: rows[0],
        });
      }
    }
  });
});

app.get("/api/logout", (req, res) => {
  currentUser = null;

  res.json({
    code: "200",
    message: "로그아웃 성공",
  });
});

//전체카테고리
app.get("/api/category/all", (req, res) => {
  db.query(`SELECT * FROM CATEGORY ;`, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("ALL category:", rows);
      if (!res.headersSent) {
        // 중복을 방지하기 위해 응답을 한 번만 보낸다.
        res.json({
          code: "200",
          message: "success",
        });
      }
    }
  });
});

//강의 카테고리
app.get("/api/category", (req, res) => {
  const categoryID = req.query.categoryID;
  console.log(categoryID);
  db.query(
    `SELECT
	l.LectureID,
	l.LecturesImageURL,
	l.Title,
	i.InstructorName,
	l.LecturePrice ,
	avg(cm.RATING) AS RatingAverage
FROM
	Lectures l
JOIN
    LectureCategory lc ON
	l.LectureID = lc.LectureID
JOIN 
    Category c ON
	c.CategoryID = lc.CategoryID
JOIN
    Instructor i ON
	l.InstructorID = i.InstructorID
JOIN COMMENTS cm ON
	cm.LECTUREID = l.LECTUREID
WHERE
	lc.CategoryID = '${categoryID}'
GROUP BY l.LECTUREID ;`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        console.log("category:", rows);
        if (!res.headersSent) {
          // 중복을 방지하기 위해 응답을 한 번만 보낸다.
          res.json({
            code: "200",
            message: "success",
          });
        }
      }
    }
  );
});

//검색
app.get("/api/search", (req, res) => {
  const title = req.query.title;
  console.log(title);
  db.query(
    `SELECT
	l.LecturesImageURL,
	l.Title,
	i.InstructorName,
	AVG(c.RATING) AS RatingAverage,
	l.LecturePrice
FROM
	LECTURES l
JOIN INSTRUCTOR i ON
	i.INSTRUCTORID = l.LECTUREID
JOIN COMMENTS c ON
	c.LECTUREID = l.LECTUREID 
WHERE
	l.TITLE LIKE '%${title}%' 
GROUP BY l.LECTUREID ;`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("해당하는 페이지가 존재하지 않습니다.");
      } else {
        console.log("search:", rows);
        if (!res.headersSent) {
          // 중복을 방지하기 위해 응답을 한 번만 보낸다.
          res.json({
            code: "200",
            message: "success",
          });
        }
      }
    }
  );
});

//장바구니
app.get("/api/cart", (req, res) => {
  const id = req.query.UserID;
  console.log(id);
  db.query(
    `SELECT
  c.CARTID,
	l.TITLE ,
	l.LECTURESIMAGEURL ,
	l.LECTUREPRICE ,
	i.INSTRUCTORNAME
FROM
	CART c
JOIN LECTURES l ON
	l.LECTUREID = c.LECTUREID
JOIN INSTRUCTOR i ON
	i.INSTRUCTORID = l.INSTRUCTORID
WHERE
	c.USERID = '${id}'
ORDER BY
	c.REGDATE DESC ;`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("해당하는 페이지가 존재하지 않습니다.");
      } else {
        console.log("cart:", rows);
        if (!res.headersSent) {
          // 중복을 방지하기 위해 응답을 한 번만 보낸다.
          res.json({
            code: "200",
            message: "sucess",
          });
        }
      }
    }
  );
});

//결제하기
app.post("/api/lecturespay", (req, res) => {
  const userid = req.body.UserID;
  const lectureID = req.body.LectureID;
  const amount = req.body.amount;
  const paymentdate = req.body.paymentdate;
  const payment = req.body.payment;
  db.query(
    `INSERT INTO PAYMENTS (UserID,LectureID,amount,paymentdate,payment) values('${userid}','${lectureID}','${amount}',now(),'${payment}');`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("결제에 실패하셨습니다");
      } else {
        console.log("payment", rows);
        if (!res.headersSent) {
          res.json({
            code: "200",
            message: "sucess",
          });
        }
      }
    }
  );
});

//강의 상세보기
app.get("/api/lectureinfo", (req, res) => {
  const lectureid = req.query.LectureID;
  db.query(
    `SELECT
	l.TITLE,
	l.LECTURESIMAGEURL,
	l.LECTUREPRICE,
	AVG(c.RATING) AS RATINGAVERAGE,
	count(c.COMMENTID) AS Countcomment,
	count(u.userID) AS CountUser,
	l.DESCRIPTION,
	i.INSTRUCTORNAME,
	i.EMAIL,
	l.UPLOADDATE
FROM
	LECTURES l
JOIN
    INSTRUCTOR i ON
	i.INSTRUCTORID = l.INSTRUCTORID
JOIN COMMENTS c ON
	c.LECTUREID = l.LECTUREID
JOIN ENROLLMENTS e ON
	e.LECTUREID = l.LECTUREID
JOIN USERS u ON
	u.USERID = e.ENROLLMENTID
WHERE
	l.LECTUREID = '${lectureid}'
GROUP BY
	l.TITLE,
	l.LECTURESIMAGEURL,
	l.LECTUREPRICE,
	l.DESCRIPTION,
	i.INSTRUCTORNAME,
	i.EMAIL;`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("해당하는 페이지가 존재하지 않습니다.");
      } else {
        console.log("lectures", rows);
        if (!res.headersSent) {
          res.json({
            code: "200",
            message: "sucess",
          });
        }
      }
    }
  );
});

//수강하기
app.post("/api/lectureinfo/enrollments", (req, res) => {
  const userid = req.body.UserID;
  const lectureid = req.body.LectureID;
  const status = req.body.paymentstatus;
  const attend = req.body.attendancerate;
  db.query(
    `INSERT INTO ENROLLMENTS (USERID,LECTUREID,ENROLLMENTDATE ,PAYMENTSTATUS,ATTENDANCERATE) VALUES ('${userid}','${lectureid}',now() ,'${PAYMENTSTATUS},'${ATTENDANCERATE}');`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("수강하기 오류");
      } else {
        console.log("enrollments", rows);
        if (!res.headersSent) {
          res.json({
            code: "200",
            message: "sucess",
          });
        }
      }
    }
  );
});

//강의 목차
app.get("/api/lectureinfo/toc", (req, res) => {
  const lectureID = req.query.LectureID;
  db.query(
    `SELECT 
	lm.*,
	lt.*
FROM 
	LectureMaterial lm 
JOIN
	LectureTOC lt ON lt.TOCID = lm.TOCID 
JOIN
	Lectures l ON l.LectureID = lt.LectureID 
WHERE 
	l.LectureID = '${lectureID}';`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("해당하는 페이지가 존재하지 않습니다.");
      } else {
        console.log("toc", rows);
        if (!res.headersSent) {
          res.json({
            code: "200",
            message: "sucess",
          });
        }
      }
    }
  );
});

//해당 강의 카테고리
app.get("/api/lectureinfo/category", (req, res) => {
  const lectureid = req.query.LectureID;
  db.query(
    `SELECT
	c.CATEGORYNAME
FROM
	LECTURES l
JOIN LECTURECATEGORY lc ON
	l.LECTUREID = lc.LECTUREID
JOIN CATEGORY c ON
	c.CATEGORYID = lc.CATEGORYID
WHERE
	l.LECTUREID = '${lectureid}' ;`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("error");
      } else {
        console.log("lecturecategory", rows);
        if (!res.headersSent) {
          res.json({
            code: "200",
            message: "sucess",
          });
        }
      }
    }
  );
});

//장바구니 추가
app.post("/api/lectureinfo/addcart", (req, res) => {
  const userid = req.body.UserID;
  const lectureid = req.body.LectureID;
  db.query(
    `INSERT INTO CART (UserID,LectureID,RegDate) VALUES ('${userid}','${lectureid}',now());`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("error");
      } else {
        console.log("addcart", rows);
        if (!res.headersSent) {
          res.json({
            code: "200",
            message: "장바구니 추가 완료",
          });
        }
      }
    }
  );
});

//찜목록 추가
app.post("/api/lectureinfo/addwishlist", (req, res) => {
  const userid = req.body.UserID;
  const lectureid = req.body.LectureID;
  db.query(
    `INSERT INTO WishList (UserID,LectureID) VALUES ('${userid}','${lectureid}');`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("error");
      } else {
        console.log("addwishlist", rows);
        if (!res.headersSent) {
          res.json({
            code: "200",
            message: "찜 목록 추가 완료",
          });
        }
      }
    }
  );
});

//수강평 출력
app.get("/api/lectureinfo/comment", (req, res) => {
  const userid = req.query.UserID;
  const lectureID = req.query.LectureID;
  db.query(
    `SELECT
	u.USERNAME ,
	c.CONTENT,
	c.COMMENT_REGDATE ,
	c.COMMENT_UPDATE
FROM
	COMMENTS c
JOIN USERS u ON
	u.USERID = c.USERID
WHERE
	c.LECTUREID = '${lectureID}'
ORDER BY
	COMMENT_REGDATE DESC;`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("수강평 출력 오류");
      } else {
        console.log("comment:", rows);
        if (!res.headersSent) {
          res.json({
            code: "200",
            message: "sucess",
          });
        }
      }
    }
  );
});

//수강평 등록
app.post("/api/lectureinfo/regCom", (req, res) => {
  const userid = req.body.UserID;
  const lectureID = req.body.LectureID;
  const content = req.body.content;
  const rating = req.body.rating;
  const sql = `INSERT INTO COMMENTS (UserID,LectureID,content,Comment_regdate,Rating) VALUES (?,?,?,now(),?);`;
  const values = [userid, lectureID, content, rating];
  db.query(sql, values, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("수강평 등록 오류");
    } else {
      console.log("regcomment", rows);
      if (!res.headersSent) {
        res.json({
          code: "200",
          message: "등록이 완료되었습니다.",
        });
      }
    }
  });
});

//수강평 수정
app.post("/api/lectureinfo/updateCom", (req, res) => {
  const commentid = req.body.commentid;
  const content = req.body.content;
  db.query(
    `UPDATE
	COMMENTS c
SET
	c.CONTENT = '${content}',
	c.COMMENT_UPDATE = now()
WHERE
	c.COMMENTID = '${commentid}';`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("수강평 수정 오류");
      } else {
        console.log("updatecom", rows);
        if (!res.headersSent) {
          res.json({
            code: "200",
            message: "수강평 수정 완료",
          });
        }
      }
    }
  );
});

//강의 화면
app.get("/api/enrollments", (req, res) => {
  const lectureid = req.query.LectureID;
  db.query(
    ` SELECT
	lt.TITLE,
	lt.PARENTTOCID ,
	lt.VIDEOLENGTH ,
  v.videourl
FROM
	LECTURETOC lt
WHERE
	lt.LECTUREID = '${lectureid}';`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("강의 화면 불러오기 오류");
      } else {
        console.log("enrollments", rows);
        if (!res.headersSent) {
          res.json({
            code: "200",
            message: "sucess",
          });
        }
      }
    }
  );
});

//마이페이지(내정보)
app.post("/api/mypage/", (req, res) => {
  const userid = req.body.UserID;
  console.log(userid);
  db.query(
    `SELECT
	u.Username as UserName, 
	u.UserEmail as UserEmail,
	u.UserCellPhone as UserPhone,
	u.UserImage 
FROM
	USERS u
WHERE
	u.USERID = '${userid}'`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("내정보 불러오기 오류");
      } else {
        console.log("profile", rows);
        if (!res.headersSent) {
          res.json({
            code: "200",
            message: "sucess",
            userinfo: rows[0],
          });
        }
      }
    }
  );
});

//프로필 이미지 변경
app.post("/api/mypage/updateimage", (req, res) => {
  const userid = req.body.UserID;
  const image = req.body.UserImage;
  db.query(
    `UPDATE
	USERS u
SET
	u.USERIMAGE = '${image}'
WHERE
	u.USERID = '${userid}';`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("이미지 변경 오류");
      } else {
        console.log("profileimage", rows);
        if (!res.headersSent) {
          res.json({
            code: "200",
            message: "이미지 변경 완료",
          });
        }
      }
    }
  );
});

//이메일 변경
app.post("/api/mypage/updateemail", (req, res) => {
  const userid = req.body.UserID;
  const email = req.body.UserEmail;
  db.query(
    `UPDATE
	USERS u
SET
	u.USEREMAIL = '${email}'
WHERE
	u.USERID = '${userid}';`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("이메일 변경 오류");
      } else {
        console.log("email", rows);
        if (!res.headersSent) {
          res.json({
            code: "200",
            message: "이메일 변경 오류",
          });
        }
      }
    }
  );
});

//비밀번호 변경
app.post("/api/mypage/updatepassword", (req, res) => {
  const userid = req.body.UserID;
  const password = req.body.Password;
  db.query(
    `UPDATE
	USERS u
SET
	u.password = '${password}'
WHERE
	u.USERID = '${userid}';`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("비밀번호 변경 오류");
      } else {
        console.log("password", rows);
        if (!res.headersSent) {
          res.json({
            code: "200",
            message: "비밀번호 변경 완료",
          });
        }
      }
    }
  );
});

//내 강의실
app.post("/api/mypage/study", (req, res) => {
  const userid = req.body.UserID;
  console.log(userid);
  db.query(
    `SELECT
	e.ENROLLMENTID as EnrollmentID,
	l.TITLE as Title,
	l.LECTURESIMAGEURL as LecturesImageURL ,
	i.INSTRUCTORNAME as Instructorname,
	e.ATTENDANCERATE as Attendancerate
FROM
	ENROLLMENTS e
JOIN LECTURES l ON
	l.LECTUREID = e.ENROLLMENTID
JOIN INSTRUCTOR i ON
	l.LECTUREID = i.INSTRUCTORID
WHERE
	e.USERID = '${userid}';`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("강의실 불러오기 오류");
      } else {
        console.log("study", rows);
        if (!res.headersSent) {
          res.json({
            code: "200",
            message: "sucess",
            study: rows,
          });
        }
      }
    }
  );
});

//찜 목록
app.get("/api/mypage/wishlist", (req, res) => {
  const userid = req.query.UserID;
  db.query(
    `SELECT
	w.LECTUREID ,
	l.TITLE ,
	l.LECTURESIMAGEURL ,
	l.LECTUREPRICE,
	i.INSTRUCTORNAME
FROM
	WISHLIST w
JOIN LECTURES l ON
	L.LECTUREID = W.LECTUREID
JOIN INSTRUCTOR i ON
	i.INSTRUCTORID = l.INSTRUCTORID
WHERE
	w.USERID = '${userid}';`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("찜 목록 불러오기 오류");
      } else {
        console.log("wishlist", rows);
        if (!res.headersSent) {
          res.json({
            code: "200",
            message: "sucess",
          });
        }
      }
    }
  );
});

//결제내역
app.get("/api/mypage/paymentlist", (req, res) => {
  const userid = req.query.UserID;
  db.query(
    `SELECT
    p.PAYMENTID,
    l.TITLE,
    p.PAYMENTDATE,
    l.LECTUREPRICE,
    e.ATTENDANCERATE
FROM
    PAYMENTS p
JOIN
    LECTURES l ON l.LECTUREID = p.LECTUREID
JOIN
    ENROLLMENTS e ON e.LECTUREID = p.LECTUREID AND e.USERID = p.USERID
WHERE
    p.USERID = '${userid}'
    AND e.PAYMENTSTATUS = 'T';`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("결제내역 불러오기 오류");
      } else {
        console.log("paymentlist", rows);
        if (!res.headersSent) {
          res.json({
            code: "200",
            message: "sucess",
          });
        }
      }
    }
  );
});

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});
