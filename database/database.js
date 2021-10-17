const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
var mongodb;

var obMongoOption = { 
  maxPoolSize: config.database.poolSize
};

var createConnection = function(){
  isConnectionPrepare = true;
  MongoClient.connect(config.database.mongoUrl, obMongoOption, function(err, database){
    if(!err){
      mongodb = database.db(config.database.databaseName);
    }
  });
};

createConnection();

var getConnection = function(callback){
  if(mongodb && mongodb !=null){
    callback(null, mongodb);
  }
  else{
    callback(true, null);
  }
};

module.exports.getConnection = getConnection;