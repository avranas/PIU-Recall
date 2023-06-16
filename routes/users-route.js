const express = require('express');
const usersController = require("./controllers/users-controller");
const authController = require("./controllers/auth-controller");
const usersRouter = express.Router();

// Get one user by ID
usersRouter.get('/:id', authController.checkIfLoggedIn, usersController.getUserById, (req, res) => {
  res.send(res.locals.user);
});

usersRouter.get('', authController.checkIfLoggedIn, (req, res) => {
  const response = {...req.user.dataValues};
  response.password = undefined;
  res.json(response);
});

// Register a new user
usersRouter.post('/', usersController.createUser, (req, res) => {
  res.send(res.locals.newUser);
});

// Delete a new user by ID
usersRouter.delete('/:id', authController.checkIfAdmin, usersController.deleteUserById, (req, res) => {
  res.send(res.locals.deletedUser);
});


module.exports = usersRouter;