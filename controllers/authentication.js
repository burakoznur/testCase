const queries = require('../database/queries');
const errorCodesController = require('./errorCodes');
const jwtController = require('./jwt');
const mailController = require('./mail');
const crypto = require('crypto');

var register = async function(req, res){
    let email = req.query.email || req.body.email || '';
    let userName = req.query.userName || req.body.userName || '';
    let password = req.query.password || req.body.password || '';

    if(email == '' || userName == '' || password == ''){
        res.status(400);
        return res.json({
            message: errorCodesController.getErrorMessages("missingParameters")
        });
    }

    password = createPasswordHash(password);

    let userId;
    let registerUser = new Promise(function(resolve, reject){
        queries.registerUser(email, userName, password, function(err, result){
            if(err){
                reject(result);
            }
            else{
                resolve(result);
            }
        });
    });

    try{
        userId  = await registerUser;
    }
    catch(err){
        res.status(401);
        return res.json({
            message: errorCodesController.getErrorMessages(err)
        });
    }

    let activationCode = jwtController.createActivationCode();
    let saveActivationCode = new Promise(function(resolve, reject){
        queries.saveActivationCode(userId, activationCode, function(err, result){
            if(err){
                reject(result);
            }
            else{
                resolve();
            }
        });
    });

    try{
        await saveActivationCode;
    }
    catch(err){
        res.status(401);
        return res.json({
            message: errorCodesController.getErrorMessages(err)
        });
    };

    let accessTokenExpireTime = jwtController.getAccessTokenExpireTime();
    let accessToken = jwtController.createAccessToken(userId, accessTokenExpireTime);

    let saveAccessToken = new Promise(function(resolve, reject){
        queries.savedAccessToken(userId, accessToken, accessTokenExpireTime, function(err, result){
            if(err){
                reject(result);
            }
            else{
                resolve();
            }
        });
    });

    try{
        await saveAccessToken;
    }
    catch(err){
        res.status(401);
        return res.json({
            message: errorCodesController.getErrorMessages(err)
        });
    }

    mailController.sendActivationMail(userName, email, activationCode);
    
    res.status(200);
    res.json({
        message: 'OK',
        accessToken: accessToken
    });
};

var login = async function(req, res){
    let email = req.query.email || req.body.email || '';
    let password = req.query.password || req.body.password || '';
    
    if(email == '' || password == ''){
        res.status(400);
        return res.json({
            message: errorCodesController.getErrorMessages("missingParameters")
        });
    }
    
    password = createPasswordHash(password);
    let userId;
    let userLogin = new Promise(function(resolve, reject){
        queries.userLogin(email, password, function(err, result){
            if(err){
                reject(result);
            }
            else{
                resolve(result);
            }
        });
    });
    
    try{
        userId  = await userLogin;
    }
    catch(err){
        res.status(401);
        return res.json({
            message: errorCodesController.getErrorMessages(err)
        });
    }

    let accessTokenExpireTime = jwtController.getAccessTokenExpireTime();
    let accessToken = jwtController.createAccessToken(userId, accessTokenExpireTime);

    let saveAccessToken = new Promise(function(resolve, reject){
        queries.savedAccessToken(userId, accessToken, accessTokenExpireTime, function(err, result){
            if(err){
                reject(result);
            }
            else{
                resolve();
            }
        });
    });

    try{
        await saveAccessToken;
    }
    catch(err){
        res.status(401);
        return res.json({
            message: errorCodesController.getErrorMessages(err)
        });
    }

    res.status(200);
    res.json({
        message: 'OK',
        accessToken: accessToken
    });
};

var myProfile = async function(req, res){
    let accessToken = req.query.accessToken || req.body.accessToken || '';
    
    if(accessToken == ''){
        res.status(400);
        return res.json({
            message: errorCodesController.getErrorMessages("missingParameters")
        });
    }
    
    let userId;
    let checkAccessToken = new Promise(function(resolve, reject){
        jwtController.verifyJwtToken(accessToken, function(err, result){
            if(err){
                reject(result);
            }
            else{
                userId = result;
                queries.checkAccessToken(userId, accessToken, function(err, data){
                    if(err){
                        reject(data);
                    }
                    else{
                        resolve()
                    }
                });
            }
        });
    });

    try{
        await checkAccessToken;
    }
    catch(err){
        res.status(401);
        return res.json({
            message: errorCodesController.getErrorMessages(err)
        });
    }

    let getUserInformations = new Promise(function(resolve, reject){
        queries.getUserInformations(userId, function(err, result){
            if(err){
                reject(result);
            }
            else{
                res.status(200);
                res.json(result);
                resolve();
            }
        });
    });

    try{
        await getUserInformations;
    }
    catch(err){
        res.status(401);
        return res.json({
            message: errorCodesController.getErrorMessages(err)
        });
    }
};

var logOut = async function(req, res){
    let accessToken = req.query.accessToken || req.body.accessToken || '';
    
    if(accessToken == ''){
        res.status(400);
        return res.json({
            message: errorCodesController.getErrorMessages("missingParameters")
        });
    }

    let userId;
    let verifyToken = new Promise(function(resolve, reject){
        jwtController.verifyJwtToken(accessToken, function(err, result){
            if(err){
                reject(result);
            }
            else{
                resolve(result);
            }
        });
    });

    try{
        userId = await verifyToken;
    }
    catch(err){
        res.status(401);
        return res.json({
            message: errorCodesController.getErrorMessages(err)
        });
    }

    let deleteAccessToken = new Promise(function(resolve, reject){
        queries.deleteAccessToken(userId, accessToken, function(err, result){
            if(err){
                reject(result);
            }
            else{
                res.status(200);
                res.json({
                    message: 'OK'
                });
                resolve();
            }
        });
    });

    try{
        await deleteAccessToken;
    }
    catch(err){
        res.status(401);
        return res.json({
            message: errorCodesController.getErrorMessages(err)
        });
    }
};

var createPasswordHash = function(password){
    return crypto.createHash('sha256').update(password).digest('hex');
};


module.exports.register = register;
module.exports.login = login;
module.exports.myProfile = myProfile;
module.exports.logOut = logOut;