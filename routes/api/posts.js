const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");

router.post(
  "/",
  [auth, [check("text", "text is required").notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(errors);
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      await newPost.save();
      res.send(newPost);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.send(posts);
  } catch (error) {
    console.error(error.message);
    res.send("server error");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.send("post not found");
    res.send(post);
  } catch (error) {
    if (error.kind == "ObjectId") return res.send("post not found");
    console.error(error.message);
    res.send("server error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.send("post not found");
    if (post.user.toString() !== req.user.id)
      return res.status(401).send("not authorized");
    await post.deleteOne();
    res.send("post removed");
  } catch (error) {
    if (error.kind == "ObjectId") return res.send("post not found");
    console.error(error.message);
    res.send("server error");
  }
});

router.put("/like/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    )
      return res.status(400).send("Post already liked by this user");
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.send(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length == 0
    )
      return res.status(400).send("Post has not been liked by this user");
    // post.likes.unshift({ user: req.user.id });
    let newLikes = [
      ...post.likes.filter((like) => like.user.toString() != req.user.id),
    ];

    post.likes = newLikes;
    await post.save();
    res.send(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.post(
  "/comment/:id",
  [auth, [check("text", "text is required").notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(errors);
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      };
      post.comments.unshift(newComment);

      await post.save();
      res.send(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

router.delete("/comment/:id/:commentId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.id.toString() == req.params.commentId
    );
    if (comment.user.toString() !== req.user.id)
      return res.status(404).send("user not authorized");

    if (!comment) return res.status(404).send("comment not found");
    post.comments = [
      ...post.comments.filter((c) => c.id.toString() != comment.id),
    ];
    await post.save();
    res.send(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
