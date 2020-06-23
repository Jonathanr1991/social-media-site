const router = require("express").Router();
let Group = require("../models/group.model"); // mongoose model we created

//used to return all Groups
router.route("/").get((req, res) => {
  Group.find()
    .then((groups) => res.json(groups))
    .catch((err) => res.status(400).json("Error: " + err));
});
// used to create Group
router.route("/add").post(async (req, res) => {
  try {
    const leader = req.body.leader;
    const memebers = req.body.memebers;
    const posts = req.body.posts;
    const creationPermitter = req.body.creationPermitter;

    const newGroup = new Group({
      leader,
      memebers,
      posts,
      creationPermitter,
    });
    newGroup
      .save()
      .then(() => res.json("Group added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch {
    res.status(500).send();
  }
});

//used to retrieve Group information
router.route("/:id").get((req, res) => {
  Group.findById(req.params.id)
    .then((Group) => res.json(Group))
    .catch((err) => res.status(400).json("Error: " + err));
});
//used to delete Group
router.route("/:id").delete((req, res) => {
  Group.findByIdAndDelete(req.params.id)
    .then(() => res.json("Group Deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});
//update Group information
router.route("/update/:id").post((req, res) => {
  Group.findById(req.params.id)
    .then((Group) => {
        Group.leader = req.body.leader;
        Group.memebers = req.body.memebers;
        Group.posts = req.body.posts;
        Group.creationPermitter = req.body.creationPermitter;

      Group.save()
        .then(() => res.json("Group updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
