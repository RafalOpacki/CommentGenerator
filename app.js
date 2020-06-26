const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is live on port ${port}`));

app.use('/', (req, res) => {
  res.send('App in on');
});
