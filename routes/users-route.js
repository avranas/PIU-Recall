const express = require('express');
const usersController = require("./controllers/users-controller");
const usersRouter = express.Router();

// Get one user by ID
usersRouter.get('/:id', usersController.getUserById, (req, res) => {
  res.send(res.locals.user);
});

// Register a new user
usersRouter.post('/', usersController.createUser, (req, res) => {
  res.send(res.locals.newUser);
});

// Delete a new user by ID
usersRouter.delete('/:id', usersController.deleteUserById, (req, res) => {
  res.send(res.locals.deletedUser);
});


module.exports = usersRouter;