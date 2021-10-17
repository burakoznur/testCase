const nodemailer = require("nodemailer");
const config = require('../config');

var sendActivationMail = function(userName, email, activationCode){
    let smtpConfig = {
        host: config.smtp.host,
        port: config.smtp.port,
        auth: (config.smtp.auth) ? config.smtp.auth : null
    };
    
    let htmlBody = 'Hello ' + userName + '<br/>' +
                   'To complete the registration, you must confirm your email address from the link below. <br/><br/>' +
                   'http://localhost:' + config.app.port + '/activateEmail?code=' + activationCode;

    let transporter = nodemailer.createTransport(smtpConfig);
    let obMailOptions = {
        from: config.smtp.from,
        to: email,
        subject: 'Activation Email',
        html: htmlBody
    };
    
    transporter.sendMail(obMailOptions, function(err, info){
        if(err){ 
            console.log('Mail sent error: ', err); 
        }
        if(info){
            console.log('Mail sent: ' + info.response); 
        }
    });    
};

module.exports.sendActivationMail = sendActivationMail;