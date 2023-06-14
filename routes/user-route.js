const express = require('express');
const userController = require("./controllers/user-controller");
const userRouter = express.Router();

// Get one user by ID
userRouter.get('/:id', userController.getUserById, (req, res) => {
  res.send(res.locals.user);
});

// Register a new user
userRouter.post('/', userController.createUser, (req, res) => {
  res.send(res.locals.newUser);
});

// Delete a new user by ID
userRouter.delete('/:id', userController.deleteUserById, (req, res) => {
  res.send(res.locals.deletedUser);
});


module.exports = userRouter;