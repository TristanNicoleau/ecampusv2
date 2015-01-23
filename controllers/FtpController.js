module.exports = function (ftp) {

    function getDirContent(path, parent_id, callback){
        var children = [];
        var inc = 0;

        ftp.ls("./data/ecampus/" + path, function(err, ftpres) {
            // console.log(ftpres);
            ftpres.forEach(function(file) {
                getFileNode(file, parent_id, path, inc, function(node){
                    children.push(node);
                });
                inc++;
            });
            callback(children);
        });
    }

    function getFileNode(file, parent_id, path, inc, callback){
        var node = {};
        node.name = file.name;
        node.children = [];
        node.id = parseInt(parent_id + '' + inc);

        if(file.type == 0){
            node.type = 'file';
            callback(node);
        } else {
            node.type = 'folder';
            getDirContent(path + node.name, node.id, function(children){
                node.children = children;
                callback(node);
            });
        }
    }

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
            var fileTree = {
                id : 'root',
                name : 'Root',
                type : 'folder',
                children : []
            };
            
            getDirContent('', null, function(children){
                fileTree.children = children;
            });

            console.log('**************************************');

            setTimeout(function(){
                console.log(fileTree);
                res.send(fileTree);
            }, 1000);
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