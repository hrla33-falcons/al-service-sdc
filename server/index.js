const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const router = require('./router.js');
const path = require('path');
const db = require('../db-pg/connection/connection');


const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(morgan('dev'));
// app.use('/', router);

app.use(express.static(path.join(__dirname, '../client/dist')), () => console.log(`rendering`))

app.listen(port, () => console.log(`you're listening to port ${port}, l e w d   b e a t s`));