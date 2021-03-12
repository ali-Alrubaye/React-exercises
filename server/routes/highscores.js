const express = require('express');
const router = express.Router();
const highhighscoresController = require('../controllers/highscoresController');

// Get All
router.get('/', highhighscoresController.highscore_index);
// Get All
router.get('/high', highhighscoresController.highscore_game);

router.get('/highten/:id', highhighscoresController.highscore_firstten);

// Get By ID
router.get('/:id', highhighscoresController.highscore_details);

// Add New highscore
router.post('/', highhighscoresController.highscore_create);
// Update
router.put('/:id', highhighscoresController.highscore_update);
//Delete highscore
router.delete('/:id', highhighscoresController.highscore_delete);

module.exports = router;
