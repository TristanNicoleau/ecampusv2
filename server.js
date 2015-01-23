// Set up ======================================================================
var express = require('express');
var mongoose = require('mongoose'); // Mongoose for mongodb
var database = require(__dirname + '/config/database'); // Load database config
var port = process.env.PORT || 8080; // Set the port
var jsftp = require("jsftp");



// Configuration ================================================================
var ftp = new jsftp({
  host: '127.0.0.1',
  port: 21, // defaults to 21
  user: 'epsi', // defaults to "anonymous"
  pass: 'epsidebian' // defaults to "@anonymous"
});

// var fileTree = {
//   id : 'root',
//   name : 'Root',
//   type : 'folder',
//   children : []
// };

// //*********************
// function getDirContent(path, parent_id, child_array){
//   var children = {};
//   var inc = 0;

//   ftp.ls("./data/ecampus/" + path, function(err, ftpres) {
//     ftpres.forEach(function(file) {
//         var node = {};
//         node.name = file.name;
//         node.children = [];
//         node.id = parseInt(parent_id + '' + inc);

//         if(file.type == 0){
//             node.type = 'file';
//         } else {
//             node.type = 'folder';
//             getDirContent(path + node.name, node.id, node.children);
//         }

//         console.log('Node '+inc);
//         console.log(node);
//         child_array.push(node);
//         inc++;
//     });
//     console.log(fileTree);
//   });
//   return children;
// }

// getDirContent('', null, fileTree.children);

//*********************

mongoose.connect(database.url); // Connect to MongoDB database

var app = express(); // Create our app with express
app.configure(function () {
    app.use(express.logger('dev')); // Log every request to the console
    app.use(express.json());
    app.use('/app', express.static(__dirname + '/public/app'));
    app.use('/css', express.static(__dirname + '/public/css'));
    app.use('/fonts', express.static(__dirname + '/public/fonts'));
    app.use('/libs', express.static(__dirname + '/public/libs'));
    app.use('/templates', express.static(__dirname + '/public/templates'));
});

// Models =======================================================================
var NewsModel = require(__dirname + '/models/NewsModel')(mongoose);

// Controllers ==================================================================
var controllers = {
    NewsController: require(__dirname + '/controllers/NewsController')(NewsModel),
    FtpController: require(__dirname + '/controllers/FtpController')(ftp)
};

// Routes =======================================================================
require(__dirname + '/config/routes')(app, controllers);

// Listen =======================================================================
app.listen(port, function () {
    console.log("App listening on port " + port);
});