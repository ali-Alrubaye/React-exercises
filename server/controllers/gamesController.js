const Game = require('../models/games');

const game_index = (req, res) => {
  Game.find()
    .then((result) => {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const game_details = (req, res) => {
  const id = req.params.id;
  Game.findById(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
const game_by_title = async (req, res) => {
  await Game.findOne({ title: req.params.title }, (err, data) => {
    if (err) return res.sendStatus(404);
    if (data == null) return res.sendStatus(404);
    res.json(data);
  });
};
const game_create = (req, res) => {
  const game = new Game(req.body);

  game
    .save()
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
    });
};
const game_update = (req, res) => {
  const id = req.params.id;
  Game.findByIdAndUpdate(id, req.body, { new: true }, (err, ev) => {
    // Handle any possible database errors
    if (err) return res.sendStatus(500).send(err);
    return res.send(ev);
  });
};
const game_delete = (req, res) => {
  const id = req.params.id;
  Game.findByIdAndDelete(id)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  game_index,
  game_details,
  game_create,
  game_update,
  game_delete,
  game_by_title,
};

function seedData() {
  const data = require('../games');

  for (const e of data) {
    const game = new Game(e);
    game.save();
  }
}
//  seedData()
