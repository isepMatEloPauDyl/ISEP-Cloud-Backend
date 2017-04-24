var express = require('express');
var router = express.Router();
const AllianceDAO = require('../models/AllianceDAO');

/***
 * Get Alliances
 */
router.get('/', function (req, res, next) {
  AllianceDAO.getAll()
    .then((alliances) => {
      res.status(200)
        .json({
          status: 'success',
          alliances: alliances
        });
    });
});

/***
 * Get Alliance with ID
 */
router.get('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  AllianceDAO.getById(id)
    .then((alliance) => {
      res.status(200)
        .json({
          status: 'success',
          alliance: alliance
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
 * Create Alliance
 */
router.post('/', function (req, res, next) {
  var name = req.body.alliance.name;
    AllianceDAO.create(name)
    .then((alliance) => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one alliance',
          alliance: alliance
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
 * Delete an Alliance
 */
router.delete('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  AllianceDAO.delete(id)
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
 * Modify a Alliance
 */
router.put('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  var name = req.body.alliance.name;

  AllianceDAO.update(id, name)
    .then((alliance) => {
      res.status(200)
        .json({
          status: 'success',
          message: 'modified a alliance',
          alliance: alliance
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
 * Get Users in Alliance
 */
router.get('/:id/users', function (req, res, next) {
  var id = parseInt(req.params.id);
  AllianceDAO.getUsers(id)
    .then((users) => {
      res.status(200)
        .json({
          status: 'success',
          users: users
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
 * Get Characters in Alliance
 */
router.get('/:id/characters', function (req, res, next) {
  var id = parseInt(req.params.id);
  AllianceDAO.getCharacters(id)
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
 * Get Characters with given class in Alliance
 */
router.get('/:id/characters/:class', function (req, res, next) {
  var id = parseInt(req.params.id);
  var characterClass = req.params.class;
  AllianceDAO.getCharactersWithClass(id, characterClass)
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
