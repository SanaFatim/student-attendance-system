const router = require('express').Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')
const { User, schema } = require("../models/user")
const auth = require('../middlewares/auth')

router.get('/account', auth, async (req,res) => {
  let user
  try{
    user = await User.findById(req.user._id).select('-password')
  } catch {
    return res.status(404).send("User not found.")
  }
  
  res.send(user);
})

router.post("/", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user;
  try {
    user = await User.find({ email: req.body.email });
    if (user.length > 0)
      return res
        .status(400)
        .send(
          "User with this email already exists. Please try a different email address"
        );
  } catch (error) {
    
  }

  try {
    user = await new User(
      _.pick(req.body, ["password", "name", "email"])
    );
  } catch (ex) {
    return res.send(ex.message);
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  result = await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(
      _.pick(result, [
        "_id",
        "name",
        "email",
        "password"
      ])
    );
});

module.exports = router