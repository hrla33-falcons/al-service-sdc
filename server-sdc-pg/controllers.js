// jshint esversion:6
const dbPgHelpers = require('../db-pg/query/dbHelpersPromise');

const controllers = {
    getAll: (req, res) => {
        dbPgHelpers.getAll((err, results) => {
            if (err) {
                res.status(404).send(err);
            } else {
                res.status(200).send(results);
            }
        });
    },
    getOne: (req, res) => {
        dbPgHelpers.getOne(req.params.id, (err, results) => {
            if (err) {
                res.status(404).send(err);
            } else {
                res.status(200).send(results.rows);
            }
        });
    },
    postOne: (req, res) => {
        console.log(req.body);
        dbPgHelpers.postOne(req.body, (err, results) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).send(results);
            }
        });
    },
    updateOne: (req, res) => {
        dbPgHelpers.updateOne(req.params.id, req.body, (err, results) => {
            if (err) {
                res.status(404).send(err);
            } else {
                res.status(200).send(results);
            }
        });
    },
    deleteOne: (req, res) => {
        dbPgHelpers.deleteOne(req.params.id, (err, results) => {
            if (err) {
                res.status(404).send(err);
            } else {
                res.status(200).send(results);
            }
        });
    }
};

module.exports = controllers;