const express = require("express");

const { Post, User, Image, Comment } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      limit: 10, // 10개만 가져오기
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      include: [
        {
          model: User, // 게시글 작성자
          attributes: ["id", "nickname"],
        },
        {
          model: User, // 좋아요 누른사람
          as: "Likers",
          attributes: ["id"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User, // 댓글 작성자
              attributes: ["id", "nickname"],
            },
          ],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
