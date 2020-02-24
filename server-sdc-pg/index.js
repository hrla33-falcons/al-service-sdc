// jshint esversion:6
// const newrelic = require('newrelic');
const express = require('express');
const next = require('next');
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./router.js');
const path = require('path');
const redis = require('redis');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const cors = require('cors');
const dbPromise = require('../db-pg/connection/connectionPromise').db;
const promise = require('bluebird');

promise.config({
    longStackTraces: true
});

promise.promisifyAll(redis.RedisClient.prototype);
promise.promisifyAll(redis.Multi.prototype);

const app = express();
const port = parseInt(process.env.PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== 'production';

const app1 = next({ dev });
const handle = app1.getRequestHandler();

app1.prepare().then(() => {
    app.get('/', (req, res) => handle(req, res));
    // app.listen(port, (err) => {
    //  if (err) throw err;
    //  console.log(`🤘 on http://localhost:${port}`);
    // });
   });

const client = redis.createClient(6379, '172.31.3.120');

client.on('connect', () => {
    console.log(`connected to redis`);
});
client.on('error', err => {
    console.log(`Error: ${err}`);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(morgan('dev'));

app.use('/other', router);

if (cluster.isMaster) {
    masterProcess();
  } else {
    childProcess();
  }

  function masterProcess() {
    console.log(`Master ${process.pid} is running!`);

    for (let i = 0; i < numCPUs; i++) {
      console.log(`Forking process num ${i}...`);
      cluster.fork();
    }
  }

  function childProcess() {
    console.log(`Worker ${process.pid} started...`);
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get(`/products/:id`, (req, res) => {
        let id = req.params.id;
        return client.get(`product:${id}`, (err, results) => {
            if (results) {
                const resultJSON = JSON.parse(results);
                return res.set({'source': 'redis'}).status(200).send(resultJSON);
            } else {
                return dbPromise.any(`select * from products where id=$1`, [id])
                .then(result => {
                    client.setex(`product:${id}`, 3600, JSON.stringify(result));
                    return res.set({'source': 'postgres'}).status(200).send(result);
                })
                .catch(err => {
                    return res.status(404).send(err);
            });
            }
        });
    });

    app.get(`/products/:id`, (req, res) => {
        return client.get(`products_${req.params._id}`, (err, results) => {
            if (results) {
                const resultJSON = JSON.parse(results);
                return res.set({'source': 'redis'}).status(200).send(resultJSON);
            } else {
                return dbPromise.any(`select * from products where id = ${req.params._id}`)
                .then(result => {
                    client.setex(`products`, 3600, JSON.stringify(result));
                    return res.set({'source': 'postgres'}).status(200).send(result);
                })
                .catch(err => {
                    return res.status(404).send(err);
            });
            }
        });
    });

    app.get(`/products`, (req, res) => {
        return client.get(`products`, (err, results) => {
            if (results) {
                const resultJSON = JSON.parse(results);
                return res.set({'source': 'redis'}).status(200).send(resultJSON);
            } else {
                return dbPromise.any(`select * from products limit 25`)
                .then(result => {
                    client.setex(`products`, 3600, JSON.stringify(result));
                    return res.set({'source': 'postgres'}).status(200).send(result);
                })
                .catch(err => {
                    return res.status(404).send(err);
            });
            }
        });
    });

    app.listen(port, () => console.log(`you're listening to port ${port}`));
  }
module.exports = app;