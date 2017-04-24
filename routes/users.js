var express = require('express');
var router = express.Router();
const UserDAO = require('../models/UserDAO');

/***
 * Get Users
 */
router.get('/', function (req, res, next) {
  UserDAO.getAll()
    .then((users) => {
      res.status(200)
        .json({
          status: 'success',
          users: users
        });
    });
});

/***
 * Get User with ID
 */
router.get('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  UserDAO.getById(id)
    .then((user) => {
      res.status(200)
        .json({
          status: 'success',
          user: user
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
 * Create user
 */
router.post('/', function (req, res, next) {
  var name = req.body.user.name;
  var email = req.body.user.email;
  if (name === undefined) {
    res.status(500)
      .json({
        status: 'Error',
        message: 'Missing parameter(s)'
      });
  }

  UserDAO.create(name, email)
    .then((user) => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one user',
          user: user
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
 * Delete a User
 */
router.delete('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  UserDAO.delete(id)
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
 * Modify a User
 */

router.put('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  var name = req.body.user.name;
  var email = req.body.user.email;
  var alliance_id = req.body.user.alliance_id;

  UserDAO.update(id, name, email, alliance_id)
    .then((user) => {
      res.status(200)
        .json({
          status: 'success',
          message: 'modified a user',
          user: user
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
 * Get Characters
 */
router.get('/:id/characters', function (req, res, next) {
  var id = parseInt(req.params.id);
  UserDAO.getCharacters(id)
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
