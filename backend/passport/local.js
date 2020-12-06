const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({
            where: {
              email,
            },
          });
          if (!user) {
            return done(null, false, { reason: "존재하지 않는 사용자입니다!" }); // 첫 번째 자리: 서버에러, 두 번째 자리: 성공,실패, 세 번째 자리: 클라이언트에러
          }

          const result = await bcrypt.compare(password, user.password);

          if (result) {
            console.log("LocalStrategy, 로그인 성공 ", result);
            return done(null, user);
          }

          return done(null, false, { reason: "비밀번호가 틀렸습니다" });
        } catch (error) {
          console.error("LocalStrategy 에러", error);
          return done(error); // 서버에러 처리
        }
      }
    )
  );
};
