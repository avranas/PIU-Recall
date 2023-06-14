const User = require('../../db/Models/Users');

const userController = {
  createUser: async function(req, res, next) {
    try {
      console.log('good');
      return next();
    } catch (err) {
      return next(err);
    }
  },
  getUserById: async function(req, res, next) {
    try {
      const id = req.params.id;
      const user = await User.findOne({
        where: { id: id}
      });
      if (!user) {
        throw {
          log: 'Error in get userById',
          statusCode: 404,
          message: `Unable to find user with the id: ${id}`
        }
      }
      res.locals.user = user;
      return next();
    } catch (err) {
      return next(err);
    }
  },
}

module.exports = userController;