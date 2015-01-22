module.exports = function (ftp) {
    return {

        // ---- READ SINGLE ----
        // Get one single user from users collection
        // get: function (req, res) {
        //     RemotePlugModel.findById(req.params.id, function (err, remotePlug) {
        //         if (err) {
        //             res.send(500);
        //         } else {
        //             console.log('READ // Remote : ');
        //             console.log(remotePlug)
        //             res.send(remotePlug);
        //         }
        //     });
        // },

        // ---- CREATE ----
        // Create a single remotePlug in users collection
        // create: function (req, res) {
        //     var news = new NewsModel(req.body);
        //     news.save(function (err, news) {
        //         if (err) {
        //             res.send(500);
        //         } else {
        //             res.send(news);
        //         }
        //     });
        //     console.log('Creating a news...');
        // },

        // // ---- DELETE ----
        // Remove a user from users collection
        // delete: function (req, res) {
        //     console.log('Removing Plug');
        //     RemotePlugModel.findByIdAndRemove(req.params.id, function (err, doc) {
        //         if (err) {
        //             res.send(500);
        //         } else {
        //             console.log(doc);
        //             res.send(true);
        //         }
        //     });
        //     return true;
        // },

        // ---- READ LIST ----
        // Get all remotes that belongs to one user
        list: function (req, res) {
            console.log('GETTING FILES LIST ...');
            var fileTree = {};

            ftp.ls(".", function(err, res) {
              res.forEach(function(file) {
                console.log(file.name);
              });
            });

            return true;
        }

        // ---- UPDATE ----
        // Update a user from users collection
        // update: function (req, res) {
        //     console.log(req.body);
        //     var plug = req.body;
        //     delete plug._id;
        //     console.log(plug);
        //     RemotePlugModel.update({
        //         _id: req.params.id
        //     }, plug, function (err, plug) {
        //         if (err) {
        //             res.send(500);
        //         } else {
        //             console.log('RemotePlug updated !');
        //             console.log(plug);
        //             res.send(plug);
        //         }
        //     });
        // }
    };
};