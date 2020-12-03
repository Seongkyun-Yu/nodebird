module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      // id는 기본적으로 들어있다.
      name: {
        type: DataTypes.STRING(20),
        allowNull: false, // 필수
      },
    },
    { charset: "utf8mb4", collate: "utf8mb4_general_ci" } // 이모티콘까지 저장
  );
  Hashtag.associate = (db) => {};
  return Hashtag;
};
