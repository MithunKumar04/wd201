"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
//const process = require("process");
const basename = path.basename(__filename);
//const env = process.env.NODE_ENV || "development";
//const config = require(__dirname + "/../config/config.json")[env];
const db = {};

const sequelize = new Sequelize("todo_sql", "postgres", "mithun007", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
  port: 5000,
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
console.log("DB started.");
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
