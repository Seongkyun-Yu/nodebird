const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id); // 쿠키랑 저장할 아이디만 저장하는 것
  });
  passport.deserializeUser(async (id, done) => {
    // 쿠키에 저장한 정보를 바탕으로 DB에서 데이터 꺼내온다
    try {
      const user = await User.findOne({ where: { id } });
      return done(null, user); // req.user안에 넣어줌
    } catch (error) {
      console.error("deserializeUser 에러", error);
      return done(error);
    }
  });

  local();
};
