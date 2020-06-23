//for what's currently ContactPage.html
const router = require("express").Router();
let Feedback = require("../models/feedback.model"); // mongoose model we created

//used to return all feedback
router.route("/").get((req, res) => {
  Feedback.find()
    .then((allFeedback) => res.json(allFeedback))
    .catch((err) => res.status(400).json("Error: " + err));
});
// used to create feedback
router.route("/add").post(async (req, res) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const comment = req.body.comment;

    const newFeedback = new Feedback({
      firstName,
      lastName,
      email,
      comment,
    });
    newFeedback
      .save()
      .then(() => res.json("Feedback added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch {
    res.status(500).send();
  }
});

//used to retrieve Feedback information
router.route("/:id").get((req, res) => {
  Feedback.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json("Error: " + err));
});
//used to delete Feedback
router.route("/:id").delete((req, res) => {
  Feedback.findByIdAndDelete(req.params.id)
    .then(() => res.json("Feedback deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
//update feedback
router.route("/update/:id").post(async (req, res) => {
  Feedback.findById(req.params.id)
    .then((feedback) => {
      feedback.firstName = req.body.firstName;
      feedback.lastName = req.body.lastName;
      feedback.email = req.body.email;
      feedback.comment = req.body.comment;

      feedback
        .save()
        .then(() => res.json("Feedback updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
