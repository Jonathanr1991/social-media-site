const router = require("express").Router();
let Thread = require("../models/thread.model"); // mongoose model we created

//used to return all Threads
router.route("/").get((req, res) => {
  Thread.find()
    .then((threads) => res.json(threads))
    .catch((err) => res.status(400).json("Error: " + err));
});
// used to create Thread
router.route("/add").post(async (req, res) => {
  try {
    const memebers = req.body.memebers;
    const messages = req.body.messages;

    const newThread = new Thread({
      memebers,
      messages,
    });
    newThread
      .save()
      .then(() => res.json("Thread added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch {
    res.status(500).send();
  }
});

//used to retrieve Thread information
router.route("/:id").get((req, res) => {
  Thread.findById(req.params.id)
    .then((thread) => res.json(thread))
    .catch((err) => res.status(400).json("Error: " + err));
});
//used to delete Thread
router.route("/:id").delete((req, res) => {
  Thread.findByIdAndDelete(req.params.id)
    .then(() => res.json("Thread Deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});
//update Thread information
router.route("/update/:id").post((req, res) => {
  Thread.findById(req.params.id)
    .then((Thread) => {
      Thread.memebers = req.body.memebers;
      Thread.messages = req.body.messages;
      

      Thread.save()
        .then(() => res.json("Thread Updted!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
