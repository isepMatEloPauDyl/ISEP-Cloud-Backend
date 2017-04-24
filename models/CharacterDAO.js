const DB = require('../models/Database');
const rad2deg = require('rad2deg');
const deg2rad = require('deg2rad');

module.exports = {
  getById(id) {
    return DB.accessor.query(
      'SELECT * FROM characters WHERE id = ${characterID}',
      { characterID: id }
    )
      .then((result) => {
        if (result.length === 0) {
          throw 'CHARACTER NOT_FOUND';
        }
        return result[ 0 ]
      })
      .catch((error) => {
        throw error;
      })
  },

  getAll() {
    return DB.accessor.query('SELECT * FROM characters')
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      })
  },

  create(name, characterClass, position, user_id) {
    return DB.accessor.query(
      'INSERT INTO characters(name, class, position, user_id) VALUES(${name},${characterClass},point(${x},${y}) ,${user_id}) RETURNING *',
      {
        name: name,
        characterClass: characterClass,
        x: position.x,
        y: position.y,
        user_id: user_id
      }
    )
      .then((result) => {
        if (result.length === 0) {
          throw 'CHARACTER NOT CREATED';
        }
        return result[ 0 ]
      })
      .catch((error) => {
        throw error;
      })
  },

  delete(id) {
    return DB.accessor.query('DELETE FROM characters WHERE id = ${characterID}',
      { characterID: id })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      })
  },

  update(id, name, characterClass, position, user_id) {
    return DB.accessor.query('UPDATE characters SET name = ${name}, class = ${characterClass}, position = point(${x},${y}), user_id = ${user_id} WHERE id = ${characterID} RETURNING *',
      {
        characterID: id,
        name: name,
        characterClass: characterClass,
        x: position.x,
        y: position.y,
        user_id: user_id
      })
      .then((result) => {
        if (result.length === 0) {
          throw 'CHARACTER NOT_FOUND';
        }
        return result[ 0 ]
      })
      .catch((error) => {
        throw error;
      })
  },

  getWithClass(characterClass) {
    return DB.accessor.query(
      'SELECT * FROM characters WHERE class = ${characterClass}',
      {
        characterClass: characterClass
      })
      .then((results) => {
        return results
      })
      .catch((error) => {
        throw error;
      })
  },

  getAlliesInRadius(characterID, radius) {
    return this.getById(characterID)
      .then((character) => {

        var lat = character.position.x;
        var long = character.position.y;

        var earthRadius = 6371000;

        var maxLat = lat + rad2deg(earthRadius / radius);
        var minLat = lat - rad2deg(earthRadius / radius);
        var maxLong = long + rad2deg(Math.asin(radius / earthRadius) / Math.cos(deg2rad(lat)));
        var minLong = long - rad2deg(Math.asin(radius / earthRadius) / Math.cos(deg2rad(lat)));

        return DB.accessor.query(
          'SELECT * FROM  (SELECT c_all.* FROM characters c ' +
          'INNER JOIN users u ON u.id = c.user_id ' +
          'INNER JOIN users u_all ON u_all.alliance_id = u.alliance_id ' +
          'INNER JOIN characters c_all ON c_all.user_id = u_all.id ' +
          'WHERE c.id = ${characterID} ' +
          'AND c_all.id != ${characterID} ' +
          'AND c_all.position[0] BETWEEN ${minLat} AND ${maxLat} ' +
          'AND c_all.position[1] BETWEEN ${minLong} AND ${maxLong}) ' +
          'AS c_box ' +
          'WHERE acos(sin(${lat})*sin(radians(c_box.position[0])) + cos(${lat})*cos(radians(c_box.position[0]))*cos(radians(c_box.position[1])-${long})) * ${earthRadius} < ${radius}' +
          'ORDER BY acos(sin(${lat})*sin(radians(c_box.position[0])) + cos(${lat})*cos(radians(c_box.position[0]))*cos(radians(c_box.position[1])-${long})) * ${earthRadius}',
          {
            characterID: characterID,
            minLat: minLat,
            maxLat: maxLat,
            minLong: minLong,
            maxLong: maxLong,
            radius: radius,
            lat: deg2rad(lat),
            long: deg2rad(long),
            earthRadius: earthRadius
          })
      })
      .then((characters) => {
        return characters;
      })
      .catch((error) => {
        console.log('error' + error);
        throw error;
      })
  },

  getEnemiesInRadius(characterID, radius) {
    return this.getById(characterID)
      .then((character) => {

        var lat = character.position.x;
        var long = character.position.y;

        var earthRadius = 6371000;

        var maxLat = lat + rad2deg(earthRadius / radius);
        var minLat = lat - rad2deg(earthRadius / radius);
        var maxLong = long + rad2deg(Math.asin(radius / earthRadius) / Math.cos(deg2rad(lat)));
        var minLong = long - rad2deg(Math.asin(radius / earthRadius) / Math.cos(deg2rad(lat)));

        return DB.accessor.query(
          'SELECT * FROM  (SELECT c_all.* FROM characters c ' +
          'INNER JOIN users u ON u.id = c.user_id ' +
          'INNER JOIN users u_all ON u_all.alliance_id != u.alliance_id ' +
          'INNER JOIN characters c_all ON c_all.user_id = u_all.id ' +
          'WHERE c.id = ${characterID} ' +
          'AND c_all.id != ${characterID} ' +
          'AND c_all.position[0] BETWEEN ${minLat} AND ${maxLat} ' +
          'AND c_all.position[1] BETWEEN ${minLong} AND ${maxLong}) ' +
          'AS c_box ' +
          'WHERE acos(sin(${lat})*sin(radians(c_box.position[0])) + cos(${lat})*cos(radians(c_box.position[0]))*cos(radians(c_box.position[1])-${long})) * ${earthRadius} < ${radius} ' +
          'ORDER BY acos(sin(${lat})*sin(radians(c_box.position[0])) + cos(${lat})*cos(radians(c_box.position[0]))*cos(radians(c_box.position[1])-${long})) * ${earthRadius}',
          {
            characterID: characterID,
            minLat: minLat,
            maxLat: maxLat,
            minLong: minLong,
            maxLong: maxLong,
            radius: radius,
            lat: deg2rad(lat),
            long: deg2rad(long),
            earthRadius: earthRadius
          })
      })
      .then((characters) => {
        return characters;
      })
      .catch((error) => {
        console.log('error' + error);
        throw error;
      })
  }
};
