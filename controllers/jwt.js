const jwt = require('jsonwebtoken');
const config = require('../config');
const moment = require('moment');
const crypto = require('crypto');
const fs = require('fs');

const privateCert = fs.readFileSync('./private.key');
const publicCert = fs.readFileSync('./public.key');

var createAccessToken = function(userId, expireTime){
    let payload = {
        iss: 'testCase',
        sub: userId,
        aud: 'testCase',
        exp: expireTime,
        nbf: moment().unix(),
        iat: moment().unix()
    };

    return jwt.sign(payload, privateCert, { algorithm: 'RS256' });
};

var getAccessTokenExpireTime = function(){
    
    return moment().unix() + (config.authentication.accessTokenExpireTime * 60);
};

var createActivationCode = function(){
    return crypto.randomBytes(30).toString('hex');
};

var verifyJwtToken = function(accessToken, callback){
    jwt.verify(accessToken, publicCert, {}, function(err, decoded){
        if(err){
            callback(true, "invalidTokenError");
        }
        else{
            callback(null, decoded.sub);
        }
    });
};

module.exports.createAccessToken = createAccessToken;
module.exports.createActivationCode = createActivationCode;
module.exports.getAccessTokenExpireTime = getAccessTokenExpireTime;
module.exports.verifyJwtToken = verifyJwtToken;