// jshint esversion:6
// const pgp = require('pg-promise')({});
// const db = pgp(connectionString);

// module.exports = db;
const promise = require('bluebird'); // best promise library today
const pgPromise = require('pg-promise'); // pg-promise core library

const initOptions = {
    // Use a custom promise library, instead of the default ES6 Promise:
    promiseLib: promise,
    capSQL: true
};

const pgp = pgPromise(initOptions);

// const cn = {
//     host: 'ec2-52-53-254-132.us-west-1.compute.amazonaws.com', // server name or IP address;
//     port: 5432,
//     database: 'sdc_pg',
//     user: 'ubuntu',
//     password: 'pw'
// };

const cn = {
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: 'sdc_pg',
    user: 'austinliu'
};

// const connectionString = 'postgres://localhost:5432/sdc_pg';
// Creating the database instance:
const db = pgp(cn);

module.exports = {db, pgp};


