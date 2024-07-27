const express = require("express");
const mongoConnect = require("./dbConfig/dbConnection").mongoConnect;
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/api-routes");
const helmet = require("helmet");
require("dotenv").config();
let appConfig = require("./config/appenvconfig.js").database;

const app = express();
const port = appConfig.port;
const IPAddress = "0.0.0.0"; // Updated to listen on all network interfaces

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(helmet());
app.use(cors());

// CORS
app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", routes);

process.on("uncaughtException", (e) => {
  console.error(`uncaughtException: ${e.message}`);
  console.log("uncaughtException: " + e);
});

process.on("unhandledRejection", (e) => {
  console.error(`unhandledRejection: ${e.message}`);
  console.log("unhandledRejection: " + e);
});

app.get("/", (req, res) =>
  res.send("Welcome " + appConfig.app_instance_name + " !!")
);
console.log("charset name", appConfig.charset);

// Path handler middleware
app.use((req, res, next) => {
  console.error(req.path + " Not found");
  res.status(404).send({
    status: 404,
    message: req.path + " Not found",
    data: [],
  });
});

// Error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    status: error.status || 500,
    message: error.message || "Internal Server Error",
    data: [],
  });
});

mongoConnect()
  .then(() => {
    const server = app.listen(process.env.PORT || port, IPAddress, () => {
      console.log(`Server started and running on http://${IPAddress}:${port}`);
    });
  })
  .catch((err) => {
    app.use((req, res, next) => {
      res.status(500).send({
        status: 500,
        message: "Internal Server Error: Database connection failed",
        data: [],
      });
    });
    console.log("Database connection failed:", err.message);
  });
