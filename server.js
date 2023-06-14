const express = require('express');
require('dotenv').config();
const path = require('node:path'); 
const app = express();
const port = 8080;

// app.get('/', (req, res) => {
//   res.status(200).send('hello world!!');
// });

app.get('/test', (req, res) => {
  res.status(200).send('test test test!!');
});

console.log('NODE_ENV: ', process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  app.use('/', express.static(path.join(__dirname, 'dist')));
}

app.listen(port, () => {
  console.log(`PIU Recall listening on port ${port}`);
});
