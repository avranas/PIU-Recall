const express = require('express');
require('dotenv').config();
const path = require('node:path');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./passport-config');
const authController = require("./routes/controllers/auth-controller");


app.use(bodyParser.json());

//Serve images
app.use("/images", express.static(__dirname + "/assets"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // Note: I spent a long time debugging because this wasn't being set correctly
    cookie: { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.session());

app.post('/login', authController.checkIfLoggedOut, passport.authenticate('local'), (req, res) => {
  res.status(200).send(`You are now logged in as: '${req.user.username}'`);
});

app.get('/logout', authController.checkIfLoggedIn, (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.status(200).send('You are now logged out.');
  });
});

app.use('/users', require('./routes/users-route'));
app.use('/songs', require('./routes/songs-route'));
app.use('/charts', require('./routes/charts-route'));
app.use('/scores', require('./routes/scores-route'));

app.get('/test', (req, res) => {
  res.status(200).send('test test test!!');
});

console.log('NODE_ENV: ', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'dist')));
}

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode).send(err.message);
});

app.get('*', (req, res, next) => {
  // console.log('404 error');
  res.status(404).send('404 Not found :(');
    // res.sendFile(path.join(__dirname, "client/index.html"));
});

app.listen(port, () => {
  console.log(`PIU Recall listening on port ${port}`);
});
