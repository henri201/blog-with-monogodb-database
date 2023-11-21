const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;   //to establish a connection

let database;

async function connect(){
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
    database = client.db('blog');
}

function getDb() {
    if (!database) {
        throw{message: 'database connection not established'};
    }
    return database;
}


module.exports = {
    connectToDatabase : connect,
    getDb: getDb
};