const utilsService = require("../services/utils");

module.exports = {
  addNewFieldToAllDocuments: (req, res, next) => {
    utilsService
      .addNewFieldToAllDocuments()
      .then((result) => {
        if (result && result.status === 200) {
          res.status(result.status || 200).send(result);
        } else {
          res.status(result.status || 400).send(result);
        }
      })
      .catch((err) => {
        res.status(err.status || 500).send({
          status: err.status || 500,
          message: err.message ? err.message : "Internal server error.",
          data: [],
        });
      });
  },
};
