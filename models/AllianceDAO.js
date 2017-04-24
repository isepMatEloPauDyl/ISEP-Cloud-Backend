const DB = require('../models/Database');

module.exports = {
  getById(id) {
    return DB.accessor.query(
      'SELECT * FROM alliances WHERE id = ${allianceID}',
      { allianceID: id }
    )
      .then((result) => {
        if (result.length === 0) {
          throw 'ALLIANCE NOT_FOUND';
        }
        return result[ 0 ]
      })
      .catch((error) => {
        throw error;
      })
  },

  getAll() {
    return DB.accessor.query('SELECT * FROM alliances')
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      })
  },

  create(name) {
    return DB.accessor.query(
      'INSERT INTO alliances(name) VALUES(${name}) RETURNING *',
      {
        name: name
      })
      .then((result) => {
        if (result.length === 0) {
          throw 'ALLIANCE NOT CREATED';
        }
        return result[ 0 ]
      })
      .catch((error) => {
        throw error;
      })
  },

  delete(id) {
    return DB.accessor.query('DELETE FROM alliances WHERE id = ${allianceID}',
      { allianceID: id })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      })
  },

  update(id, name) {
    return DB.accessor.query('UPDATE alliances SET name = ${name} WHERE id = ${allianceID} RETURNING *',
      {
        allianceID: id,
        name: name
      })
      .then((result) => {
        if (result.length === 0) {
          throw 'ALLIANCE NOT_FOUND';
        }
        return result[ 0 ]
      })
      .catch((error) => {
        throw error;
      })
  },

  getUsers(allianceID) {
    return DB.accessor.query(
      'SELECT * FROM users WHERE alliance_id = ${allianceID}',
      { allianceID: allianceID })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      })
  },

  getCharacters(allianceID) {
    return DB.accessor.query(
      'SELECT characters.* FROM characters INNER JOIN users ON characters.user_id = users.id WHERE users.alliance_id = ${allianceID}',
      { allianceID: allianceID })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      })
  },

  getCharactersWithClass(allianceID, characterClass) {
    return DB.accessor.query(
      'SELECT characters.* FROM characters INNER JOIN users ON characters.user_id = users.id WHERE users.alliance_id = ${allianceID} AND characters.class = ${characterClass}',
      {
        allianceID: allianceID,
        characterClass: characterClass
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      })
  },

};
