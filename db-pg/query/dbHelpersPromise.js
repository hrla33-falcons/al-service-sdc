// jshint esversion:6
const pgClient = require('../connection/connectionPromise').db;
console.log('DB connected');

const dbHelpers = {
    getAll: function(cb) {
        pgClient.any(`select products.data from products limit 25`)
        .then(data => cb(null, data))
        .catch(error => cb(error));
    },
    getOne: function(id, cb) {
        pgClient.any(`select products.data from products where id=$1`, [id])
        .then(function(data) {
            // success;
            cb(null, data);
        })
        .catch(function(error) {
            // error;
            cb(error);
        });
    },
    postOne: function(body, cb) {
        console.log(body);
        pgClient.none(`insert into products (data) values('{"itemname":$1, "itemimage":$2, "typesize":$3, "price":$4, "itemdescription":$5, "rating":$6, "numberratings":$7}')`, [body.itemname, body.itemimage, body.typesize, body.price, body.itemdescription, body.rating, body.numberratings], (err) => {
            if (err) {
                cb(err);
            } 
        });
    },
    updateOne: function(id, body, cb) {
        pgClient.none(`update products set data = '{"itemname":$1, "itemimage":$2, "typesize":$3, "price":$4, "itemdescription":$5, "rating":$6, "numberratings":$7}' where id = $8`, [body.itemname, body.itemimage, body.typesize, body.price, body.itemdescription, body.rating, body.numberratings, id], (err) => {
            if (err) {
                cb(err);
            }
        });
    },
    deleteOne: function(id, cb) {
        pgClient.query(`delete from products where id = $1`, [id], (err) => {
            if (err) {
                cb(err);
            } 
        });
    }
};

module.exports = dbHelpers;