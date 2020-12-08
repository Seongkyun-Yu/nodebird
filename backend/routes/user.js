const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const { User, Post } = require("../models");
const db = require("../models");

const router = express.Router();

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("패스포트 인증 에러", err);
      return next(err);
    }
    if (info) {
      console.error("info error", info);
      return res.status(401).send(info.reason); // 401 : 허가되지 않은
    }

    return req.login(user, async (loginErr) => {
      // req.login이 실행되면 serializeUser 시작됨 (passport/index.js)
      if (loginErr) {
        console.error("로그인 에러", loginErr);
        return next(loginErr);
      }
      console.log("로그인 성공", user);
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        //attributes: ['id', 'nickname', 'email'], // db에서 이것만 가져오겠다
        attributes: {
          exclude: ["password"], // password 빼고 다
        },
        include: [
          // 다른 테이블과 합치기
          {
            model: Post,
          },
          {
            model: User,
            as: "Followings",
          },
          {
            model: User,
            as: "Followers",
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/", async (req, res, next) => {
  // POST /user
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다."); // 403 : 금지된
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error); // 브라우저에 어떤 에러 났는지 알려줌 status 500
  }
});

router.post("/user/logout", (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});

module.exports = router;
