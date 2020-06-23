const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

function makeServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(express.static(path.join(__dirname, "build")));

  //connects mongo to mongodb atlas
  const uri = "mongodb://localhost:27017/"; // || process.env.ATLAS_URI || "mongodb+srv://mongoUser:towson2020@cluster0-yatdl.mongodb.net/test?retryWrites=true&w=majority";
  mongoose //try to connect to cloud, then try local, then just wait for cloud connection
    .connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: false
    }).catch((err) => {console.log(
        "Got error connecting MongoDB instance at " + uri + " [" + err + "]"
      );});

  var connection = mongoose.connection;

  connection.on("error", (err) => {
    console.log("The previous message shouldn't be anything to be worried about if you're not trying to use the local db specifically - attempting to connect to remote MongoDB server...");
    mongoose.connect(process.env.ATLAS_URI, {
      //not sure what the idiomatic way of doing a backup connection is
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    connection.on("error", () => {
      console.log("mongoose couldn't connect to remote server either, exiting");
      process.kill(1);
    });
  });

  connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
  });

  // adding model files to be able to use them
  const userRouter = require("./routes/user");
  const eventRouter = require("./routes/event");
  const postRouter = require("./routes/post");
  const groupRouter = require("./routes/group");
  const threadRouter = require("./routes/thread");
  const feedbackRouter = require("./routes/feedback");

  app.use("/user", userRouter);
  app.use("/event", eventRouter);
  app.use("/post", postRouter);
  app.use("/group", groupRouter);
  app.use("/thread", threadRouter);
  app.use("/feedback", feedbackRouter);


  return app;
}
module.exports = makeServer();
