module.exports = function (mailer, UserModel) {
    return {
        validation: function (req, res) {
            var path = req.protocol + '://' + req.get('host');
            console.log(path);
            UserModel.findOne({encryptedMail: req.params.id, active: false}, function (err, user) {
                console.log(user);
                if (user !== null) {
                    console.log('User trouve');
                    UserModel.update({encryptedMail: req.params.id, active: false}, { $set: { active: true}}, function (err, user) {
                        if (err) {
                            console.log('Erreur update');
                            res.redirect(500, '/');
                        } else {
                            console.log(user);
                            console.log('OK Update');
                            res.redirect('/validation');
                        }
                    });
                } else {
                    res.redirect(500, '/');
                }
            });
        }
    };
};