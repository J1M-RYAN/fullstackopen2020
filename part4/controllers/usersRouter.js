const usersRouter = require('express').Router();
const jwt = require('jsonwebtoken');
require('express-async-errors');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {errorHandler} = require('../utils/middleware');
usersRouter.use(jsonParser);

usersRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const body = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  if (body.username.length < 3 || body.password.length < 3) {
    const err = body.username.length < 3 ? 'username too short' : 'password too short';
    return res.status(401).send({error: `Validation Error: ${err}`});
  }

  const newUser = new User({
    username: body.username,
    password: passwordHash,
    name: body.name,
  });

  const savedUser = await newUser.save();
  res.send({success: `sent ${body.name}'s login details`});
});
usersRouter.use(errorHandler);
module.exports = usersRouter;
