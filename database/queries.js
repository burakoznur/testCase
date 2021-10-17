const config = require("../config");
const db = require("./database");
const NumberInt = require("mongodb").Int32;
const ObjectId = require('mongodb').ObjectID;
const moment = require('moment');

var registerUser = function(email, userName, password, callback){
    db.getConnection(function(err, conn){
        if(!err){
            conn.collection('users').insertOne({
                user_name: userName,
                password: password,
                email: email,
                registration_date: new Date(),
                activation_date: new Date()
            }, function(err, result){
                if(err){
                    if(err.code == 11000){
                        callback(true, 'registeredEmailError');
                    }
                    else{
                        callback(true, 'sqlError');
                    }
                }
                else{
                    callback(null, result.insertedId.toString());
                }
            });
        }
        else{
            callback(true, 'sqlError');
        }
    });
};

var saveActivationCode = function(userId, activationCode, callback){
    db.getConnection(function(err, conn){
        if(!err){
            conn.collection('email_activation_codes').insertOne({
                user_id: userId,
                code: activationCode,
                expire_date: NumberInt(createActivationCodeExpiretime()),
                code_is_used: NumberInt(0)
            }, function(err, result){
                if(err){
                    callback(true, 'sqlError');
                }
                else{
                    callback(null, null);
                }
            });
        }
        else{
            callback(true, 'sqlError');
        }
    });
};

var createActivationCodeExpiretime = function(){
    return moment().unix() + (60 * config.authentication.activationCodeExpireTime);
}

var userLogin = function(email, password, callback){
    db.getConnection(function(err, conn){
        if(!err){
            conn.collection('users').findOne({
                email: email,
                password: password
            }, function(err, result){
                if(err){
                    callback(true, 'sqlError');
                }
                else{
                    if(result && result != null){
                        callback(null, result._id.toString());
                    }
                    else{
                        callback(true, "userNotFound");
                    }
                }
            })
        }
        else{
            callback(true, 'sqlError');
        }
    });
};

var savedAccessToken = function(userId, accessToken, accessTokenExpireTime, callback){
    db.getConnection(function(err, conn){
        if(!err){
            conn.collection('user_sessions').insertOne({
                user_id: userId,
                access_token: accessToken,
                expire_time: NumberInt(accessTokenExpireTime)
            }, function(err, result){
                if(err){
                    callback(true, 'sqlError');
                }
                else{
                    callback(null, null);
                }
            });
        }
        else{
            callback(true, 'sqlError');
        }
    });
};

var checkAccessToken = function(userId, accessToken, callback){
    db.getConnection(function(err, conn){
        if(!err){
            conn.collection('user_sessions').findOne({
                user_id: userId,
                access_token: accessToken
            }, function(err, result){
                if(err){
                    callback(true, 'sqlError');
                }
                else{
                    if(result != null){
                        callback(null, null);
                    }
                    else{
                        callback(true, 'authenticationError');
                    }
                }
            });
        }
        else{
            callback(true, 'sqlError');
        }
    }); 
};

var getUserInformations = function(userId, callback){
    db.getConnection(function(err, conn){
        if(!err){
            conn.collection('users').findOne({
                _id: ObjectId(userId)
            },
            {
                projection: {
                    _id: 0,
                    userId: "$_id",
                    userName: "$user_name",
                    email: "$email",
                    registrationDate: "$registration_date",
                    activationDate: "$activation_date"
                }
            }, function(err, result){
                if(err){
                    callback(true, 'sqlError');
                }
                else{
                    if(result != null){
                        callback(null, result);
                    }
                    else{
                        callback(true, "userNotFound");
                    }
                }
            });
        }
        else{
            callback(true, 'sqlError');
        }
    });
};

var deleteAccessToken = function(userId, accessToken, callback){
    db.getConnection(function(err, conn){
        if(!err){
            conn.collection('user_sessions').deleteOne({
                user_id: userId,
                access_token: accessToken
            }, function(err, result){
                if(err){
                    callback(true, 'sqlError');
                }
                else{
                    callback(null, null);
                }
            });
        }
        else{
            callback(true, 'sqlError');
        }
    });
};

module.exports.registerUser = registerUser;
module.exports.saveActivationCode = saveActivationCode;
module.exports.userLogin = userLogin;
module.exports.savedAccessToken = savedAccessToken;
module.exports.checkAccessToken = checkAccessToken;
module.exports.getUserInformations = getUserInformations;
module.exports.deleteAccessToken = deleteAccessToken;