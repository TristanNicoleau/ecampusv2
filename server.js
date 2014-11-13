// Set up ======================================================================
var express = require('express');
var port = process.env.PORT || 8080; // Set the port
var mysql      = require('mysql');
var connection = require('./config/database')(mysql);

// Configuration ================================================================
var app = express(); // Create our app with express
connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//     if (err) throw err;

//     console.log('The solution is: ', rows[0].solution);
// });

connection.end();

// Models =======================================================================
/*var UserModel = require(__dirname + '/models/User')(mongoose);
var RemotePlugModel = require(__dirname + '/models/RemotePlug')(mongoose);*/

// Tools =======================================================================
//var MailTools = require('./tools/MailTools')(UserModel, mailer);

// Controllers ==================================================================
/*var controllers = {
    AuthCtrl: require(__dirname + '/controllers/AuthCtrl')(UserModel),
    MailCtrl: require(__dirname + '/controllers/MailCtrl')(mailer, UserModel),
    UserCtrl: require(__dirname + '/controllers/UserCtrl')(UserModel, crypto, MailTools),
    RemotePlugCtrl: require(__dirname + '/controllers/RemotePlugCtrl')(RemotePlugModel)
};
//controllers.MailCtrl.confirm();*/
// Routes =======================================================================
//require(__dirname + '/config/routes')(app, controllers);

// Listen =======================================================================
app.listen(port, function () {
    console.log("App listening on port " + port);
});