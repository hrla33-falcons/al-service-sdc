dbHelpers = require('../database/index.js');

module.exports = {
  getAll: (req, res) => {
    console.log(`you made it into controllers.getAll`);
    dbHelpers.getAll(req, (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).send(err);
      } else {
        console.log(`successful controllers.getAll`);
        res.status(200).send(results);
      }
    });
  },

  postOne: (req, res) => {
    console.log(`you made it into controllers.postOne`);
    dbHelpers.save(req, (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).send(`error in controllers.postOne`);
      } else {
        console.log(`successful controllers.postOne`);
        res.status(200).send(results);
      }
    });
  }
};