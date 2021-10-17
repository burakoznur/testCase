const express = require('express');
const app = express();
const config = require("./config");
const authenticationController = require('./controllers/authentication');
const codeController = require('./controllers/code');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


var serverPort = config.app.port || 3500;
app.listen(serverPort);
console.log("Server is starting...")
console.log("Server start at port: ", serverPort);


app.post('/signup', function(req, res){
    authenticationController.register(req, res);
});

app.post('/login', function(req, res){
    authenticationController.login(req, res);
});

app.get('/my-profile', function(req, res){
    authenticationController.myProfile(req, res);
});

app.delete('/logout', function(req, res){
    authenticationController.logOut(req, res);
});

app.get('/code', function(req, res){
    codeController.getNewWord(req, res);
});