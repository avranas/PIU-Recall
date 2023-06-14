const express = require('express');
const userController = require("./controllers/user-controller");
const userRouter = express.Router();

// Get all users
userRouter.get('/', userController.createUser, (req, res) => {
  res.send('Getting all users...')
});

//Get one user by ID
userRouter.get('/:id', userController.getUserById, (req, res) => {
  
  res.send(res.locals.user);
});

module.exports = userRouter;