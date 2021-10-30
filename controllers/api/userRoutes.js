const router = require("express").Router();
const User = require("../../models/User");
//creating a user
router.post("/", async (req, res) => {
  //check if username has been used
  try {
    const userData = await User.findOne({where: {name: req.body.name}})
    if (userData) {
      res.status(409).send("Username must be unique")
    }
  } catch (err) {}
  //check if email has been used
  try {
    const userData = await User.findOne({where: {email: req.body.email}})
    if (userData) {
      res.status(409).send("Email must be unique")
    }
  } catch (err) {}
  //use regex to verify email is email format
  try {
    const userData = await User.create(
      {
        ...req.body,
        role_id: 2,
      })
    //creating session for the new user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
//Loging in user
router.post("/login", async (req, res) => {
  //use regex to verify email is email format
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    //Creating a new session for the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.role_id = userData.role_id

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
//destroying the users session and thus logging them out
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
