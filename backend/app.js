const express = require("express");
const cors = require("cors");

const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const passportConfig = require("./passport");

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

app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello express");
});

app.get("/api", (req, res) => {
  res.send("hello api");
});

app.get("/api/posts", (req, res) => {
  res.json([
    { id: 1, content: "hello1" },
    { id: 2, content: "hello2" },
    { id: 3, content: "hello3" },
  ]);
});

app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("서버 실행중");
});
