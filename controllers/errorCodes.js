var obErrorCodes = {
    missingParameters: "Missing parameters",
    userNotFound: "Wrong email or password",
    sqlError: "Query Error",
    invalidTokenError: "Invalid Token",
    authenticationError: "Authentication Error",
    registeredEmailError: "Registered Email",
    undefined: "Undefined message!"    
};

var getErrorMessages = function(errorCode){
    if(obErrorCodes.hasOwnProperty(errorCode)){
        return obErrorCodes[errorCode];
    }
    else{
        return obErrorCodes.undefined;
    }
};

module.exports.getErrorMessages = getErrorMessages;

