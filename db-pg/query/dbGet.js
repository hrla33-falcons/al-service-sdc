
const {Pool} = require('pg')
const db = new Pool({
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: 'sdc_pg',
    user: 'austinliu',
    // password: 'pw',
    max: 15,
    idleTimeoutMillis: 3000,
    connectionTimeOutMillis: 2000
});
    //gets all transcation information along with budget information based off the transactions category id
    async function getter (id,cb) {
        try{
            await db.query(`SELECT * FROM products where id=${id}`)
            .then((result) => cb(null,result.rows))
            .catch((err) => cb(err))
        }

    catch(ex) {
        console.log(`something went wrong getting listingid ${id}  ${ex}`)
    }
}



module.exports = getter