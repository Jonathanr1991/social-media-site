const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: { type: String, required: true },
  postText: { type: String },
  postImgPath: { type: String },
  time: { type: Date, default: Date.now() },
  numberOfLikes: { type: Number, default: '0' },
  flag: { type: Boolean, default: false },
  comments: [
    {
      postedBy: { type: String, ref: 'user' },
      text: { type: String },
      time: { type: Date, default: Date.now() },
      likes: { type: Number, default: '0' },
    },
  ],
});

const post = mongoose.model("post", postSchema);

module.exports = post;
