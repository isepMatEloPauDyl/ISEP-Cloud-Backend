var pgp = require('pg-promise')();
var path = require('path');
var QueryFile = require('pg-promise').QueryFile;

var config = {
  host: 'localhost',
  port: 5432,
  database: 'efrei',
  user: 'efrei',
  password: 'password'
};

const DB = {
  accessor: pgp(config),

  sql: function (file) {
    var fullPath = path.join(__dirname, file); // generating full path;
    return new QueryFile(fullPath, { minify: false });
  }

};

module.exports = DB;