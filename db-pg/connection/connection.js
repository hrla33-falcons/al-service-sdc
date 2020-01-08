// jshint esversion:6

// const pg = require('pg');

// const connectionString = `postgres://austinliu:@localhost:5432/sdc_pg`;

// const pgClient = new pg.Client(connectionString);

// module.exports = pgClient;

//START POSTGRESQL
const { Pool } = require('pg');
const pool = new Pool({
  database: 'sdc_pg',
  host: 'ec2-52-53-254-132.us-west-1.compute.amazonaws.com',
//   host: 'ec2-13-57-30-36.us-west-1.compute.amazonaws.com',
  user: 'ubuntu',
  password: 'pw',
  max: 15,
  idleTimeoutMillis: 3000,
  connectionTimeOutMillis: 2000
});

// pool.connect(err => {
//   if (err) {
//     console.error('connection error POSTGRESQL from localhost', err.stack)
//   } else {
//     console.log('connected to POSTGRESQL from localhost')
//   }
// })

module.exports = pool;

//END POSTGRESQL