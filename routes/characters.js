var express = require('express');
var router = express.Router();
const CharacterDAO = require('../models/CharacterDAO');

/***
 * Get Characters
 */
router.get('/', function (req, res, next) {
  CharacterDAO.getAll()
    .then((characters) => {
      res.status(200)
        .json({
          status: 'success',
          characters: characters
        });
    });
});

/***
 * Get Character with ID
 */
router.get('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  CharacterDAO.getById(id)
    .then((character) => {
      res.status(200)
        .json({
          status: 'success',
          character: character
        });
    })

    .catch((error) =>
      res.status(500)
        .json({
          status: 'Error',
          message: error
        })
    )
});

/***
 * Create character
 */
router.post('/', function (req, res, next) {
  var name = req.body.character.name;
  var characterClass = req.body.character.class;
  var position = req.body.character.position;
  var user_id = req.body.character.user_id;
  CharacterDAO.create(name, characterClass, position, user_id)
    .then((character) => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one character',
          character: character
        });
    })
    .catch((error) =>
      res.status(500)
        .json({
          status: 'Error',
          message: error
        })
    )
});

/***
 * Delete a Character
 */
router.delete('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  CharacterDAO.delete(id)
    .then((result) => {
      res.status(200)
        .json({
          status: 'success',
          message: result
        });
    })
    .catch((error) =>
      res.status(500)
        .json({
          status: 'Error',
          message: error
        })
    )
});

/***
 * Modify a Character
 */

router.put('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  var name = req.body.character.name;
  var characterClass = req.body.character.class;
  var position = req.body.character.position;
  var user_id = req.body.character.user_id;

  CharacterDAO.update(id, name, characterClass, position, user_id)
    .then((character) => {
      res.status(200)
        .json({
          status: 'success',
          message: 'modified a character',
          character: character
        });
    })
    .catch((error) =>
      res.status(500)
        .json({
          status: 'Error',
          message: error
        })
    )
});

/***
 * Get Characters with given class
 */
router.get('/all/:class', function (req, res, next) {
  var characterClass = req.params.class;
  CharacterDAO.getWithClass(characterClass)
    .then((characters) => {
      res.status(200)
        .json({
          status: 'success',
          characters: characters
        });
    })

    .catch((error) =>
      res.status(500)
        .json({
          status: 'Error',
          message: error
        })
    )
});

/***
 * Get Characters allied Characters in radius
 */
router.get('/:id/allies/:radius', function (req, res, next) {
  var id = parseInt(req.params.id);
  var radius = parseInt(req.params.radius);
  CharacterDAO.getAlliesInRadius(id, radius)
    .then((characters) => {
      res.status(200)
        .json({
          status: 'success',
          characters: characters
        });
    })
    .catch((error) =>
      res.status(500)
        .json({
          status: 'Error',
          message: error
        })
    )
});

/***
 * Get Characters enemy Characters in radius
 */
router.get('/:id/ennemies/:radius', function (req, res, next) {
  var id = parseInt(req.params.id);
  var radius = parseInt(req.params.radius);
  CharacterDAO.getEnemiesInRadius(id, radius)
    .then((characters) => {
      res.status(200)
        .json({
          status: 'success',
          characters: characters
        });
    })
    .catch((error) =>
      res.status(500)
        .json({
          status: 'Error',
          message: error
        })
    )
});

module.exports = router;
