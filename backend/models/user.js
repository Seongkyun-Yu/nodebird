module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // MySQL에는 user 테이블 생성
      // id는 기본적으로 들어있다.
      email: {
        type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME을 많이씀
        allowNull: false, // 필수
        unique: true, // 고유한 값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, // 필수
      },
    },
    { charset: "utf8", collate: "utf8_general_ci" } // 한글저장
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post); // 유저는 포스트를 여러개 가지고 있다
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" }); // 다대다, through는 중간 테이블 이름, as 뒤에 있는 것으로 LikedId 컬럼이 생긴다
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "followIngId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "followId",
    });
  };
  return User;
};
