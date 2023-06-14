const User = require('../../db/Models/User');

const userController = {
  createUser: async function (req, res, next) {
    try {
      const body = req.body;
      const username = body.username;
      const password = body.password;
      // Return an error if anything is missing in the request body
      let missingField = null;
      if (!username) missingField = 'username';
      if (!password) missingField = 'password';
      if (missingField) {
        throw {
          statusCode: 400,
          message: `'${missingField} is missing from the request body'`
        }
      }
      // If user with the same name already exists throw an error
      const user = await User.findOne({
        where: { username: username },
      });
      if (user) {
        throw {
          statusCode: 404,
          message: `A user with the name '${username}' already exists`,
        };
      }
      // Create the user
      const newUser = await User.create({
        username,
        password,
      });
      // We obviously don't want to return the password, even if it is hashed
      newUser.password = undefined;
      res.locals.newUser = newUser;
      return next();
    } catch (err) {
      err.log = 'Error in get userController.createUser';
      return next(err);
    }
  },
  getUserById: async function (req, res, next) {
    try {
      const id = req.params.id;
      const user = await User.findOne({
        where: { id: id },
      });
      if (!user) {
        throw {
          statusCode: 404,
          message: `Unable to find user with the id: ${id}`,
        };
      }
      res.locals.user = user;
      return next();
    } catch (err) {
      err.log = 'Error in get userController.getUserById';
      return next(err);
    }
  },
  deleteUserById: async function (req, res, next) {
    try {
      const id = req.params.id;
      const userToDelete = await User.findOne({
        where: {
          id: id,
        },
      });
      if (!userToDelete) {
        throw {
          statusCode: 400,
          message: `Unable to find a user with the id: '${id}'`,
        };
      }
      //TODO: Delete all of the user's scores here

      // Delete the user
      await User.destroy({
        where: {
          id: id,
        },
      });
      // We obviously don't want to return the password, even if it is hashed
      userToDelete.password = undefined;
      res.locals.deletedUser = userToDelete;
      return next();
    } catch (err) {
      err.log = 'Error in get userController.deleteUserById';
      return next(err);
    }
  },
};

module.exports = userController;
