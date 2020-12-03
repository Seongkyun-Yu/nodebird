module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      // id는 기본적으로 들어있다.
      src: {
        type: DataTypes.STRING(200),
        allowNull: false, // 필수
      },
    },
    { charset: "utf8", collate: "utf8_general_ci" }
  );
  Image.associate = (db) => {};
  return Image;
};
