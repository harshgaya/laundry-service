module.exports = {
  database: {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    mongo_uri: process.env.MONGODB_URI,
    port: process.env.application_port,
  },
};
