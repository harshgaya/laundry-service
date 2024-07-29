const getDb = require("../dbConfig/dbConnection").getDb;
const mongodb = require("mongodb");
let addOrdersToDb = (data) => {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.collection("orders")
      .find({ batchNumber: data.batchNumber })
      .next()
      .then((result) => {
        if (result) {
          resolve({
            status: 400,
            message: "this batch  already exists",
            data: data,
          });
        } else {
          data.isReachedWashing = false;
          data.isWashed = false;
          data.isDried = false;
          data.isSegregated = false;
          data.isActive = true;
          data.createdTime = new Date();
          data.updatedTime = new Date();
          (data.campuseEmployeeId1 = null),
            (data.driverId1 = null),
            (data.washingSupervisorId = null),
            (data.dryingSupervisorId = null),
            (data.segregationSupervisorId1 = null),
            (data.segregationSupervisorId2 = null),
            (data.driverId2 = null),
            (data.campuseEmployeeId2 = null),
            (data.currentLocation = data.currentLocation);
          data.data.forEach((item) => {
            item.isReachedWashing = false;
            item.isWashed = false;
            item.isDried = false;
            item.isSegregated = false;
            item.isActive = true;
            item.createdTime = new Date();
            item.updatedTime = new Date();
          });
          db.collection("orders")
            .insertOne(data)
            .then((result) => {
              resolve({
                status: 200,
                message: "student added in db",
                data: data,
              });
            })
            .catch((error) => {
              reject({
                status: 500,
                message: error,
                data: [],
              });
            });
        }
      });
  });
};

module.exports = {
  //addOrdersToDb
  addOrdersToDb: (data) =>
    new Promise((resolve, reject) => {
      return addOrdersToDb(data)
        .then((result) => {
          if (result && result.status == 200) {
            resolve(result);
          } else {
            reject(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }),
};
