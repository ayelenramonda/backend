import express from 'express';
import data from '../gzip/data.js';

const app = express();

app.get('/', (req, res) => {
  res.send(data);
});

export default app;
