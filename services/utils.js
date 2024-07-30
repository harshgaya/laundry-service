const getDb = require("../dbConfig/dbConnection").getDb;

let addNewFieldToAllDocuments = () => {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.collection("users").updateMany(
      {},
      {
        $set: {
          collegeName: "sri chaitanya",
        },
      }
    );
  }).catch((error) => {
    console.log("error", error);
  });
};
addNewFieldToAllDocuments();
