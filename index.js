import express from 'express';

const app = express();
const title = 'Blog';
const host = 'localhost';
const port = 3000;

app.get('/', (req, res) => {
  res.send('GET /');
});

app.listen(port, () => {
  console.log(`${title} listening at http://${host}:${port}`);
});