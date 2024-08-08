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
      .find({ campusId: new mongodb.ObjectId(data.campusId) })
      .sort({ tagNumber: -1 })
      .limit(1)
      .toArray()
      .then((result) => {
        let lastTagNumber = 0;
        if (result.length != 0) {
          lastTagNumber = result[0].tagNumber;
          db.collection("students")
            .find({
              tagNumber: data.tagNumber,
              campusId: new mongodb.ObjectId(data.campusId),
            })
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
                    collegeName: data.collegeName,
                    tagNumber: data.tagNumber,
                    rollNumber: data.rollNumber,
                    campusId: new mongodb.ObjectId(data.campusId),
                    mobile: data.mobile,
                    email: data.email,
                    dob: data.dob,
                    collegeYear: data.collegeYear,
                    branch: data.branch,
                    address: data.address,
                    isActive: true,
                    adharNumber: data.adharNumber,
                    createdTime: new Date(),
                    updatedTime: new Date(),
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
        } else {
          lastTagNumber = lastTagNumber + 1;
        }
      });
  });
};
let addCollegeToDb = (data) => {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.collection("campus")
      .find({ name: data.name })
      .next()
      .then((result) => {
        if (result) {
          resolve({
            status: 400,
            message: "campus already exists",
            data: data,
          });
        } else {
          db.collection("campus")
            .insertOne({
              name: data.name,
              college: data.college,
              campusId: data.name
                .split(" ")
                .map((word) => word[0])
                .join(""),
              location: data.location,
              address: data.address,
              collegeSupervisorId: data.collegeSupervisorId,
              isActive: true,
              createdTime: new Date(),
              updatedTime: new Date(),
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
    db.collection("employee")
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
          db.collection("employee")
            .insertOne({
              name: data.name,
              password: data.password,
              createdTime: new Date(),
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
              updatedTime: new Date(),
              collegeName: data.college ?? "",
              campusId: new mongodb.ObjectId(data.campusId),
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
    db.collection("employee")
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
    db.collection("employee")
      .find({ email: data.email, password: data.password })
      .next()
      .then((result) => {
        if (result) {
          db.collection("employeeAttendance")
            .insertOne({
              name: result.name,
              isLogin: true,
              createdTime: new Date(),
              employeeId: result._id,
            })
            .then((result1) => {
              result.loginTime = new Intl.DateTimeFormat("en-IN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date());
              resolve({
                status: 200,
                message: "User can login",
                data: [result],
              });
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
let employeeLogout = (data) => {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.collection("employeeAttendance")
      .insertOne({
        name: data.name,
        isLogin: false,
        createdTime: new Date(),
        employeeId: new mongodb.ObjectId(data.employeeId),
      })
      .then((result) => {
        resolve({
          status: 200,
          message: "logout done!",
          data: [result],
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
module.exports = {
  //addCollegeToDb
  //getStudentByTagNumber
  //employeeLogout
  employeeLogout: (data) =>
    new Promise((resolve, reject) => {
      return employeeLogout(data)
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
