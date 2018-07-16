var MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'partyDriver';

var model = {
    findAll: function(collection, query, projection, callback){
        // Use connect method to connect to the server
        MongoClient.connect(url, function(err, client) {
            const db = client.db(dbName);
            const col = db.collection(collection);
            
            // Find some documents
            col.find(query).project(projection).toArray(function(err, result) {
                client.close();
                callback(err, result);
            });
        });
    },
    addNew: function(collection, data, callback){
        MongoClient.connect(url, function(err, client) {
            const db = client.db(dbName);
            const col = db.collection(collection);
            
            col.insertOne(data, function(err, result) {
                client.close();
                callback(err, result);
            });
        });
    }
}

module.exports = model;