module.exports = function (RemotePlugModel) {
    return {

        // ---- READ SINGLE ----
        // Get one single user from users collection
        get: function (req, res) {
            RemotePlugModel.findById(req.params.id, function (err, remotePlug) {
                if (err) {
                    res.send(500);
                } else {
                    console.log('READ // Remote : ');
                    console.log(remotePlug)
                    res.send(remotePlug);
                }
            });
        },

        // ---- CREATE ----
        // Create a single remotePlug in users collection
        create: function (req, res) {
            var remotePlug = new RemotePlugModel(req.body);
            remotePlug.save(function (err, remotePlug) {
                if (err) {
                    res.send(500);
                } else {
                    res.send(remotePlug);
                }
            });
        },

        // // ---- DELETE ----
        // Remove a user from users collection
        delete: function (req, res) {
            console.log('Removing Plug');
            RemotePlugModel.findByIdAndRemove(req.params.id, function (err, doc) {
                if (err) {
                    res.send(500);
                } else {
                    console.log(doc);
                    res.send(true);
                }
            });
            return true;
        },

        // ---- READ LIST ----
        // Get all remotes that belongs to one user
        list: function (req, res) {
            RemotePlugModel.find({
                owners: req.session.userId
            }, function (err, plugs) {
                if (err) {
                    res.send(500);
                } else {
                    console.log('RemotePlugList loaded !')
                    console.log(plugs);
                    res.send(plugs);
                }
            });
            return true;
        },

        // ---- UPDATE ----
        // Update a user from users collection
        update: function (req, res) {
            console.log(req.body);
            var plug = req.body;
            delete plug._id;
            console.log(plug);
            RemotePlugModel.update({
                _id: req.params.id
            }, plug, function (err, plug) {
                if (err) {
                    res.send(500);
                } else {
                    console.log('RemotePlug updated !');
                    console.log(plug);
                    res.send(plug);
                }
            });
        },

        // ---- SWITCH REMOTE ----
        // Switch the state of the remote plug (on / off)
        activateSwitch: function (req, res) {
            var exec = require('child_process').exec;
            var child;
            var script = 'sudo /home/conserto/workspace/RemotePlugTest ' + req.body.active + ' ' + req.body.group + ' ' + req.body.convector;

            child = exec(script, function (error, stdout, stderr) {
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null) {
                    console.log('exec error: ' + error);
                    res.send(500);
                }
                res.end();
            });
        }
    };
};