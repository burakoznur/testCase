var config={
    "app": {
        "port": 3500,
        "version": "v1.0"
    },
    "database": {
        "mongoUrl": "mongodb://unburak:111111@127.0.0.1:27017/unburakServers?authSource=admin",
        "databaseName": "testCase",
        "poolSize": 20,
        "numberOfRetries": 5,
        "connectTimeoutMS": 3000
    },
    "smtp": {
        "host": "smtp.gmail.com",
        "port": 587,
        "service": "gmail",
        "from": "4dsight",
        "auth": {
            "user": "***",
            "pass": "***"
        }
    },
    "authentication": {
        "activationCodeExpireTime": 3,
        "accessTokenExpireTime": 1500
    }
};

module.exports=config;