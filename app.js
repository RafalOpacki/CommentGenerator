const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

MongoClient.connect(
  process.env.CONNECTION_STRING,
  { useUnifiedTopology: true },
  () => {
    console.log('Connected to DB');
  },
);

app.listen(port, () => console.log(`Server is live on port ${port}`));

app.use('/', (req, res) => {
  res.send('App in on');
});
