const mongoose = require('mongoose');

const HighscoresSchema = new mongoose.Schema({
  game: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  player: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  score: {
    type: Number,
    required: true,
  },
});

const Highscores = mongoose.model('Highscores', HighscoresSchema);

module.exports = Highscores;
