const getDb = require("../dbConfig/dbConnection").getDb;
const mongodb = require("mongodb");

let getStudentByTagNumber = (tagNumber) => {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.collection("students")
      .find({ tagNumber: tagNumber })
      .next()
      .then((result) => {
        if (result) {
          resolve({
            status: 200,
            message: "student  exists",
            data: [result],
          });
        } else {
          resolve({
            status: 200,
            message: "student does not exists",
            data: [],
          });
        }
      });
  });
};

let addStudentToDb = (data) => {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.collection("students")
      .find({ tagNumber: data.tagNumber })
      .next()
      .then((result) => {
        if (result) {
          resolve({
            status: 400,
            message: "student already exists",
            data: data,
          });
        } else {
          db.collection("students")
            .insertOne({
              name: data.name,
              college: data.college,
              tagNumber: data.tagNumber,
              rollNumber: data.rollNumber,
              collegeId: data.collegeId,
              mobile: data.mobile,
              email: data.email,
              dob: data.dob,
              collegeYear: data.collegeYear,
              branch: data.branch,
              address: data.address,
              isActive: true,
              adharNumber: data.adharNumber,
              createdTime: Date(),
              updatedTime: Date(),
              deviceToken: data.deviceToken,
            })
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
let addCollegeToDb = (data) => {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.collection("colleges")
      .find({ name: data.name })
      .next()
      .then((result) => {
        if (result) {
          resolve({
            status: 400,
            message: "college already exists",
            data: data,
          });
        } else {
          db.collection("colleges")
            .insertOne({
              name: data.name,
              location: data.location,
              address: data.address,
              collegeSupervisorId: data.collegeSupervisorId,
              isActive: true,
              createdTime: Date(),
              updatedTime: Date(),
            })
            .then((result) => {
              resolve({
                status: 200,
                message: "colleges added in db",
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

let addUserIntoDb = (data) => {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.collection("users")
      .find({ email: data.email })
      .next()
      .then((result) => {
        if (result) {
          resolve({
            status: 400,
            message: "User already exists",
            data: data,
          });
        } else {
          db.collection("users")
            .insertOne({
              name: data.name,
              password: data.password,
              createdTime: Date(),
              mobile: data.mobile,
              email: data.email,
              deviceToken: data.deviceToken,
              userImage: data.userImage,
              address: data.address,
              userLocation: data.userLocation,
              gender: data.gender,
              profession: data.profession,
              userType: data.userType,
              isActive: true,
              isOnline: true,
              isVerified: true,
              adharNumber: data.adharNumber,
              updatedTime: Date(),
            })
            .then((result) => {
              resolve({
                status: 200,
                message: "User added in db",
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
let getUsers = () => {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.collection("users")
      .find()
      .sort({ createdTime: 1 })
      .toArray()
      .then((result) => {
        resolve({
          status: 200,
          message: "Users found",
          data: result,
        });
      })
      .catch((error) => {
        reject({
          status: 500,
          message: error,
          data: [],
        });
      });
  });
};
let getRoles = () => {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.collection("roles")
      .find()
      .sort({ role_id: 1 })
      .toArray()
      .then((result) => {
        resolve({
          status: 200,
          message: "Users found",
          data: result,
        });
      })
      .catch((error) => {
        reject({
          status: 500,
          message: error,
          data: [],
        });
      });
  });
};
let deleteUser = (userId) => {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.collection("users")
      .deleteOne({ _id: new mongodb.ObjectId(userId) })
      .then((result) => {
        resolve({
          status: 200,
          message: "User deleted successfully!",
          data: result,
        });
      })
      .catch((error) => {
        reject({
          status: 500,
          message: error,
          data: [],
        });
      });
  });
};
let updateUser = (id, updateData) => {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.collection("users")
      .updateOne({ _id: new mongodb.ObjectId(id) }, { $set: updateData })
      .then((result) => {
        resolve({
          status: 200,
          message: "User updated successfully!",
          data: result,
        });
      })
      .catch((error) => {
        reject({
          status: 500,
          message: error,
          data: [],
        });
      });
  });
};
let getUserByIdAndPassword = (data) => {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.collection("users")
      .find({ email: data.email, password: data.password })
      .next()
      .then((result) => {
        if (result) {
          resolve({
            status: 200,
            message: "User can login",
            data: [result],
          });
        } else {
          resolve({
            status: 200,
            message: "User id and password invalid",
            data: [],
          });
        }
      })
      .catch((error) => {
        reject({
          status: 500,
          message: error,
          data: [],
        });
      });
  });
};
module.exports = {
  //addCollegeToDb
  //getStudentByTagNumber

  getStudentByTagNumber: (tagNumber) =>
    new Promise((resolve, reject) => {
      return getStudentByTagNumber(tagNumber)
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

  addCollegeToDb: (data) =>
    new Promise((resolve, reject) => {
      return addCollegeToDb(data)
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
  addStudentToDb: (data) =>
    new Promise((resolve, reject) => {
      return addStudentToDb(data)
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
  deleteUser: (userId) =>
    new Promise((resolve, reject) => {
      return deleteUser(userId)
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
  getRoles: () =>
    new Promise((resolve, reject) => {
      return getRoles()
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
  getUserByIdAndPassword: (data) =>
    new Promise((resolve, reject) => {
      return getUserByIdAndPassword(data)
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
  updateUser: (id, updatedData) =>
    new Promise((resolve, reject) => {
      return updateUser(id, updatedData)
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
  getUsers: () =>
    new Promise((resolve, reject) => {
      return getUsers()
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
  addUserIntoDb: (data) =>
    new Promise((resolve, reject) => {
      return addUserIntoDb(data)
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
