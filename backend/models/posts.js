module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      // id는 기본적으로 들어있다.
      content: {
        type: DataTypes.TEXT,
        allowNull: false, // 필수
      },
    },
    { charset: "utf8mb4", collate: "utf8mb4_general_ci" } // 이모티콘까지 저장
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // 포스트는 어떤 사람에게 속해있다
    db.Post.belongsToMany(db.Hastag); // 포스트는 많은 해시태그에 속해있다
    db.Post.hasMany(db.Comment); // 포스트는 많은 커멘트를 가지고 있다
    db.Post.hasMany(db.Image); // 포스트는 많은 이미지를 가지고 있다
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
    db.Post.belongsTo(db.Post, { as: "Retweet" });
  };
  return Post;
};
