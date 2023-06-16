const authController = {
  checkIfLoggedIn: function(req, res, next) {
    if (!req.user) {
      return next({
        statusCode: 401,
        message: 'You need to be logged in to do that'
      })
    }
    return next();
  },
  checkIfLoggedOut: function(req, res, next) {
    if (req.user) {
      return next({
        statusCode: 401,
        message: 'You need to be logged out to do that'
      })
    }
    return next();
  },
  checkIfAdmin: function(req, res, next) {
    if (!req.user || req.user.username !== 'Admin') {
      return next({
        statusCode: 401,
        message: 'You need to be logged in as an admin to do that'
      })
    }
    return next();
  }
  
}

module.exports = authController;