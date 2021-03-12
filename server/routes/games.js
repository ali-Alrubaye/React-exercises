const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');

// Get All
router.get('/', gamesController.game_index);
// Get By ID
router.get('/:id', gamesController.game_details);

router.get('/title/:title', gamesController.game_by_title);

// Add New game
router.post('/', gamesController.game_create);
// Update
router.put('/:id', gamesController.game_update);
//Delete game
router.delete('/:id', gamesController.game_delete);

module.exports = router;
