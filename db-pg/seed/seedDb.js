// jshint esversion:6
// Import required modules
const fs = require('fs');
const path = require('path');
const { Pool, Client} = require('pg');
const copyFrom = require('pg-copy-streams').from;
const config = require('./config.json');

// // inputfile & target table
var inputFile = path.join(__dirname, 'out.csv');
var targetTable = 'products';

// // Getting connectin parameters from config.json
const host = config.host;
const user = config.user;
const db = config.db;
const port = config.port;
const password = config.password;
const conString = `postgres://${user}:${password}@${host}:${port}/${db}`;
const csvPath = path.join(__dirname, './out.csv');

// // Connecting to Database
// var pool = new Pool({connectionString: conString});
const client = new Client({
    connectionString: conString,
});
console.log(inputFile);
// client.connect(function(err, client, done) {
//     var stream = client.query(copyFrom(`COPY ${targetTable} (id, itemname, itemimage, typesize, price, itemdescription, rating, numberratings) FROM '${csvPath}' DELIMITER ',' CSV HEADER`), [1], (err, res) => {
//         done();
//         if (err) {
//           console.log(err.stack);
//         } else {
//           console.log(res.rows[0]);
//         }
//       });
//     var fileStream = fs.createReadStream(inputFile, {
//         autoClose: true
//     });
//     fileStream.on('end', done);
//     fileStream.on('error', done);
//     stream.on('error', done);
//     stream.on('end', done);
//     console.log('beginning seeding DB');
//     console.time('seedDB');
//     fileStream.pipe(stream);
// });

client.connect();
  // Execute Copy Function
console.time('seedDB');
var stream = client.query(copyFrom(`COPY ${targetTable} (id, itemname, itemimage, typesize, price, itemdescription, rating, numberratings) FROM '${csvPath}' DELIMITER ',' CSV HEADER`));
var fileStream = fs.createReadStream(inputFile);

fileStream.on('error', (error) =>{
    console.timeEnd('seedDB');
    console.log(`Error in reading file: ${error}`);
});
stream.on('error', (error) => {
    console.timeEnd('seedDB');
    console.log(`Error in copy command: ${error}`);
});
stream.on('end', () => {
    console.timeEnd('seedDB');
    console.log(`Completed loading data into ${targetTable}`);
    client.end();
    fileStream.close();
});
fileStream.pipe(stream);

// pool.connect(function(err, client, done) {
//   var stream = client.query(copyFrom(`COPY ${targetTable} FROM STDIN`));
//   var fileStream = fs.createReadStream('out.csv');
//   fileStream.on('error', done);
//   stream.on('error', done);
//   stream.on('end', done);
//   fileStream.pipe(stream);
// });


// fileStream.on('end', () => {
//     done();
//     console.log('All the data in the file has been read');
//     fileStream.close();
//     console.timeEnd('seedDB');
//     console.log(`Completed loading data into ${targetTable}`);                
//     pool.end();
// });
// fileStream.on('error', error => {
//     done();
//     console.log(`Error in reading file: ${error}`);
// });
// stream.on('error', (error) => {
//     done();
//     console.log(`Error in copy command: ${error}`);
// });
// stream.on('end', () => {
//     // console.timeEnd('seedDB');
//     done();
//     console.log(`Completed loading data into ${targetTable}`);                
//     // pool.end();
// });

