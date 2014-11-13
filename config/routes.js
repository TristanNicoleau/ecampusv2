// Expose the routes to our app with module.exports
module.exports = function (app, controllers) {

    // ---- RESTRICT FUNCTION ------------
    // Function used in several routes to test if session is available or not, if not, send 401 HTTP response
    var restrict = function (req, res, next) {
        if (req.session.userId) {
            next();
        } else {
            res.send(401);
        }
    };

    // ---- GLOBAL ROUTES ------------
    app.get('/', function (req, res) {
        if (req.session.userId) {
            console.log('COOKIE !!!');
            res.cookie('id', req.session.userId);
        }
        res.sendfile('public/index.html');
    });

    app.get('/validation', function (req, res) {
        res.sendfile('public/views/validation.html');
    });


    // ---- USER ROUTES ------------
    //app.get('/api/users', controllers.UserCtrl.list);
    app.get('/api/users/:id', restrict, controllers.UserCtrl.get);
    app.post('/api/users', controllers.UserCtrl.create);
    app.put('/api/users/:id', restrict, controllers.UserCtrl.update);
    app.delete('/api/users/:id', controllers.UserCtrl.delete);
    app.get('/api/users/:id/mail/confirm', controllers.MailCtrl.validation);
    // ---- AUTHENTICATION ROUTES ------------
    app.post('/api/login', controllers.AuthCtrl.login);
    app.get('/api/logout', controllers.AuthCtrl.logout);
    app.get('/api/session', restrict, controllers.AuthCtrl.connected);
    // ---- REMOTE PLUGS ROUTES ------------
    app.get('/api/remotes/:id', restrict, controllers.RemotePlugCtrl.get);
    app.post('/api/remotes', restrict, controllers.RemotePlugCtrl.create);
    app.get('/api/remotes', restrict, controllers.RemotePlugCtrl.list);
    app.put('/api/remotes/:id', restrict, controllers.RemotePlugCtrl.update);
    app.delete('/api/remotes/:id', restrict, controllers.RemotePlugCtrl.delete);
    app.post('/api/remotes/:id/switch', restrict, controllers.RemotePlugCtrl.activateSwitch);

    // ---- DEVICES ROUTES ------------
    // app.get('/api/remotes', restrict, RemotePlugCtrl.list);
    // app.get('/api/remote/:id', restrict, RemotePlugCtrl.get);
    // app.post('/api/remote', restrict, RemotePlugCtrl.create);
    // app.put('/api/remote/:id', restrict, RemotePlugCtrl.update);
    // app.delete('/api/remote/:id', restrict, RemotePlugCtrl.delete);
};