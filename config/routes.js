// Expose the routes to our app with module.exports
module.exports = function (app, controllers) {

    // ---- RESTRICT FUNCTION ------------
    // Function used in several routes to test if session is available or not, if not, send 401 HTTP response
    var restrict = function (req, res, next) {
        if (req.session.userToken) {
            next();
        } else {
            res.send(401);
        }
    };

    // ---- GLOBAL ROUTES ------------
    app.get('/', function (req, res) {
        res.sendfile('public/login.html');
    });

    app.get('/ecampusv2', function (req, res) {
        res.sendfile('public/index.html');
    });

    // ---- USER ROUTES ------------

    // ---- NEWS ROUTES ------------
    app.get('/api/news', controllers.NewsController.list);
    app.get('/api/news/:id', controllers.NewsController.get);
    app.post('/api/news', controllers.NewsController.create);
    app.put('/api/news/:id', restrict, controllers.NewsController.update);
    app.delete('/api/news/:id', restrict, controllers.NewsController.delete);
    // ---- FTP ROUTES ------------
    app.get('/api/ftp', controllers.FtpController.list);
    // app.get('/api/ftp/:id', controllers.FtpController.get);
    // app.post('/api/news', controllers.FtpController.create);
    // app.put('/api/news/:id', restrict, controllers.FtpController.update);
    // app.delete('/api/news/:id', restrict, controllers.FtpController.delete);
};