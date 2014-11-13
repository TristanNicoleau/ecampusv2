module.exports = function (UserModel) {
    return {
        // ---- LOGIN ----
        // Login function to authenticate the user
        login: function (req, res) {
            UserModel.findOne({
                username: req.body.username
            }, function (err, user) {
                console.log(user);
                if (err) {
                    console.log(err);
                } else if (user !== null) {
                    if (user.active === true && req.body.password === user.password) {
                        console.log('User logged in : ' + user.username);
                        req.session.userId = user._id;
                        console.log(req.session);
                        res.send({
                            userId: user._id
                        });
                    } else {
                        if (user.active === false) {
                            console.log('User not active : ' + user.username);
                            res.send({
                                active: false
                            });
                        } else {
                            res.send(null);
                        }
                    }
                } else {
                    res.send(null);
                }
                res.end();
            });
        },

        // ---- LOGOUT ----
        // Logout function to disconnect the user
        logout: function (req, res) {
            console.log('Logout user');
            req.session = null;
            res.send({
                result: true
            });
            console.log("Current session : ");
            console.log(req.session);
        },

        // ---- SESSION OPEN ----
        // Logout function to disconnect the user
        connected: function (req, res) {
            console.log('session call');
            res.redirect('/api/user/' + req.session.userId);
        }
    };
};