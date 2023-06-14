const express = require('express');
require('dotenv').config();
const path = require('node:path'); 
const app = express();
const port = 8080;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/users', require('./routes/user-route'));
app.use('/songs', require('./routes/song-route'));

app.get('/test', (req, res) => {
  res.status(200).send('test test test!!');
});

console.log('NODE_ENV: ', process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  app.use('/', express.static(path.join(__dirname, 'dist')));
}

app.use('*', (req, res, next) => {
  res.status(404).send("Not found :(")
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode).send(err.message);
});

app.listen(port, () => {
  console.log(`PIU Recall listening on port ${port}`);
});
