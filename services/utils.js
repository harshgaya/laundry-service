const getDb = require("../dbConfig/dbConnection").getDb;
const mongodb = require("mongodb");

let addNewFieldToAllDocuments = () => {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.collection("employee")
      .updateMany(
        {},
        {
          $set: {
            campusId: new mongodb.ObjectId("66b49bc6c3249d998cc16b93"),
          },
        }
      )
      .then((result) => {
        resolve({
          status: 200,
          message: "doc updated",
          data: [],
        });
      })
      .catch((e) => {
        reject({
          status: 500,
          message: e,
          data: [],
        });
      });
  }).catch((error) => {
    console.log("error", error);
  });
};
module.exports = {
  addNewFieldToAllDocuments: () =>
    new Promise((resolve, reject) => {
      return addNewFieldToAllDocuments()
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
