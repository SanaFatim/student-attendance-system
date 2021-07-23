const router = require("express").Router();
const { User } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(3),
});

router.post("/", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {email , password} = req.body
  let user;

  user = await User.findOne({email});
  if(!user) return res.status(400).send('Invalid Email')

  const validPassword = await bcrypt.compare(password, user.password)
  if(!validPassword) return res.status(400).send('Invalid Password')
  
  const token = user.generateAuthToken();
  res.send(token);

});

module.exports = router;
