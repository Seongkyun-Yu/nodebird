const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const morgan = require("morgan");

const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const db = require("./models");
const passportConfig = require("./passport");

dotenv.config(); // 민감정보 설정
const app = express();

// DB 설정
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

// passport 설정
passportConfig();

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3060",
    credentials: true, // 쿠키 전달 허용
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 세션 설정
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET, // 이 키로 암호화함 (쿠키 만듦) 따라서  해킹당하지 않게 업로드 되지 않는 파일로 정리함 .env
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});
app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("서버 실행중");
});
