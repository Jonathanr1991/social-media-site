const router = require("express").Router();
let User = require("../models/user.model"); // mongoose model we created
const bcrypt = require("bcrypt"); // used to encrypt passwords

//used to return all users
router.route("/").get((req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json("Error: " + err));
});
// used to create user
router.route("/add").post(async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const email = req.body.email;
        const password = hashedPassword;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;

        const newUser = new User({
            email,
            password,
            firstName,
            lastName,
        });

        newUser
            .save()
            .then(() => res.json("You have Registered"))
            .catch((err) => res.status(400).json("Error" + err));
    } catch {
        res.status(500).send();
    }
});
//checks if passwords are the same
router.route("/login").post(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user == null) {
        return res.status(400).send("Cannot find user");
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send({"Message":"User Logged in", "user": user});
            
        } else {
            res.send("check email and password");
        }
    } catch {
        res.status(500).send();
    }
});
//used to retrieve user information
router.route("/:id").get((req, res) => {
    User.findById(req.params.id)
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json("Error: " + err));
});
//used to delete user
router.route("/:id").get((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then((user) => res.json("User Deleted"))
        .catch((err) => res.status(400).json("Error: " + err));
});
//used for updating user table
router.route("/update/:id").post((req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            user.email = req.body.email;
            user.password = req.body.password;
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.major = req.body.major;
            user.bio = req.body.bio;
            user.imgageURL = req.body.imgageURL;

            user.save()
                .then(() => res.json("User Updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
