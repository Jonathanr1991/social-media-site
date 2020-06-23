const router = require("express").Router();
const mongoose = require("mongoose");
let Post = require("../models/post.model"); // mongoose model we created

//used to return all posts
router.route("/").get((req, res) => {
  Post.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json("Error: " + err));
});
//used to return all posts
router.route("/userPost/:id").get((req, res) => {
  Post.find({user: req.params.id})
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json("Error: " + err));
});
// used to create a post
router.route("/add").post(async (req, res) => {
  try {
    const user = req.body.user;
    const postText = req.body.postText;
    const postImgPath = req.body.postImgPath;
    const numberOfLikes = req.body.numberOfLikes;
    const flag = req.body.flag;
    const comments = req.body.comments;

    const newPost = new Post({
      user,
      postText,
      postImgPath,
      numberOfLikes,
      flag,
      comments,
    });
    newPost
      .save()
      .then(() => res.json("Post added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch {
    res.status(500).send();
  }
});

//used to retrieve Post information
router.route("/:id").get((req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json("Error: " + err));
});
//used to delete Post
router.route("/:id").delete((req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.json("post Deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});
//update event information
router.route("/update/:id").post(async(req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      post.user = req.body.user;
      post.postText = req.body.postText;
      post.postImgPath = req.body.postImgPath;
      post.numberOfLikes = req.body.numberOfLikes;
      post.flag = req.body.flag;
      post.comments = req.body.comments;

      post
        .save()
        .then(() => res.json("Post updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
