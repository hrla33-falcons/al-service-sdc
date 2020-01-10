
const {Client} = require('pg')
const db = new Client({
    database: 'sdc_pg',
    host: 'ec2-52-53-254-132.us-west-1.compute.amazonaws.com',
  //   host: 'ec2-13-57-30-36.us-west-1.compute.amazonaws.com',
    user: 'ubuntu',
    password: 'pw',
});


    db.connect()
    //gets all transcation information along with budget information based off the transactions category id
    async function getter (id,cb) {
        try{
            console.log(id);
            await db.query(`SELECT * FROM products where id=${id}`)
            .then((result) => cb(null,result))
            .catch((err) => cb(err))
        }

    catch(ex) {
        console.log(`something went wrong getting listingid ${id}  ${ex}`)
    }
    finally {
        await db.end()
    }
}



module.exports = getter