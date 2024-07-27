const mongodb = require("mongodb");
require("dotenv").config();
let dbconfig = require("../config/appenvconfig").database;
const MongoClient = mongodb.MongoClient;
let _db;
let dbConnectionStatus = "DISCONNECTED"; // Track connection status

const mongoConnect = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbconfig.mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then((client) => {
        console.log("Connected to MongoDB");
        dbConnectionStatus = "CONNECTED"; // Update status on successful connection
        _db = client.db();
        resolve();
      })
      .catch((err) => {
        console.log("DB connection error: ", err);
        dbConnectionStatus = "DISCONNECTED"; // Update status on failure
        reject(err); // Reject the promise with the error
      });
  });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
exports.dbConnectionStatus = () => dbConnectionStatus; // Export the connection status function
