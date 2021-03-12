require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
//Middleware
app.use(express.json());

const PORT = process.env.PORT || 8000;

const dbURI = process.env.dbURI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((result) =>
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  )
  .catch((err) => console.log(err));

// Members API Routes
app.use('/highscores', require('./routes/highscores'));
app.use('/highscores/high', require('./routes/highscores'));

app.use('/highscores/highten', require('./routes/highscores'));
app.use('/games', require('./routes/games'));
app.use('/games/title', require('./routes/games'));
