
const {Client} = require('pg')
const db = new Client({
    host: '172.31.3.120', // server name or IP address;
    port: 5432,
    database: 'sdc_pg',
    user: 'ubuntu',
    password: 'pw'
});


    db.connect()
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