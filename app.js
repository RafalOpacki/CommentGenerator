const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const commentRoutes = require('./routes/comment/comment.routes');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

mongoose.connect(
  process.env.CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('connected to DB');
  },
);

app.listen(port, () => console.log(`Server is live on port ${port}`));

app.get('/', (req, res) => {
  res.send('App in on');
});

app.use(cors());
app.use(bodyParser.json());

app.use('/comments', commentRoutes);
