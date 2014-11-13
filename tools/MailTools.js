module.exports = function (UserModel, mailer) {
    var MailTools = {
        // send mail with defined transport object
        confirm: function (user, path) {
            var html = 'Votre compte Location a été crée avec succès ! <br> Pour activer votre compte, cliquez sur le lien suivant <a href="' + path + '"> Activation du compte </a>';
            var mail = {
                from: mailer.from, // sender address
                //to: "nicoleau.t144s@gmail.com", // list of receivers
                to: user.email,
                subject: "Votre compte Location a été créé avec succès ! ✔", // Subject line
                html: html // html body
            }
            MailTools.send(mail);
        },
        validation: function (req, res) {
            console.log('validation');
        },
        // send mail with defined transport object
        send: function (mailStructure) {
            mailer.smtp.sendMail(mailStructure, function (error, response) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Message sent: " + response.message);
                }

            });
        }
    }
    return MailTools;
}