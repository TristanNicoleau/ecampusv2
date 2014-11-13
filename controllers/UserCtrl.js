module.exports = function (UserModel, crypto, MailTools) {
    'use strict'
    return {
        // ---- CREATE ----
        // Create a single user in users collection
        create: function (req, res) {
            var newUser = new UserModel(req.body);
            console.log('Creation du user');
            console.log(newUser);
            UserModel.findOne({
                $or: [
                    {
                        username: newUser.username
                    },
                    {
                        email: newUser.email
                    }
            ]
            }, function (err, user) {
                if (user !== null) {
                    if (user.username === newUser.username) {
                        console.log('User already existed');
                        res.send({
                            code: 1
                        });
                    } else if (user.email === newUser.email) {
                        console.log('email already used');
                        res.send({
                            code: 2
                        });
                    }
                } else {
                    newUser.active = false;
                    newUser.encryptedMail = crypto.createHash('md5').update(newUser.email).digest("hex");
                    newUser.save(function (err, user) {
                        if (err) {
                            console.log('Error HTTP 500 Internal Server Error');
                            res.send(500);
                        } else {
                            console.log('User created');
                            var path = req.protocol + '://' + req.get('host') + req.originalUrl + '/' + user.encryptedMail + '/mail/confirm';
                            console.log(path);
                            MailTools.confirm(newUser, path);
                            res.send({
                                code: 0,
                                user: user
                            });
                        }
                    });
                }
            });
        },
        // ---- READ SINGLE ----
        // Get one single user from users collection
        get: function (req, res) {
            UserModel.findById(req.params.id, function (err, user) {
                if (err) {
                    res.send(500);
                } else {
                    console.log('READ // User : ' + user);
                    res.send(user);
                }
            });
        },
        // ---- READ LIST ----
        // Get all users from users collection
        list: function (req, res) {
            UserModel.find(function (err, users) {
                if (err) {
                    res.send(500);
                } else {
                    console.log(users);
                    res.send(users);
                }
            });
        },
        // ---- UPDATE ----
        // Update a user from users collection
        update: function (req, res) {
            delete req.body._id;
            console.log(req.body);
            UserModel.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
                if (err) {
                    res.send(500);
                } else {
                    console.log('Utilisateur mis à jour : ' + user);
                    res.send({
                        result: true,
                        user: user
                    });
                }
            });
        },
        // ---- DELETE ----
        // Remove a user from users collection
        delete: function (req, res) {
            // User.collection.remove();
            // res.end('Users removed');
        }
    };
};