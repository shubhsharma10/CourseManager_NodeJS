module.exports = function (app) {
    app.get('/api/user', findAllUsers);
    app.get('/api/user/:userId', findUserById);
    app.post('/api/user', createUser);
    app.get('/api/profile', profile);
    app.put('/api/profile', updateProfile);
    app.post('/api/login', login);
    app.post('/api/logout',logout);

    var userModel = require('../models/user/user.model.server');

    function findUserById(req, res) {
        var id = req.params['userId'];
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            })
    }

    function profile(req, res) {
        console.log(req.session['currentUser']);
        res.send(req.session['currentUser']);
    }

    function updateProfile(req,res) {
        var userId = req.session['currentUser']._id;
        var newUser = req.body;

        userModel.updateUser(userId,newUser)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.json(user);
            })
            .catch(function(error){
                res.sendStatus(500).send(error);
            });
    }

    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.send(user);
            })
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

    function login(req,res){
        var username = req.body.username;
        var password = req.body.password;
        userModel.findUserByCredentials(username,password)
            .then(function(user) {
            console.log(user);
            req.session['currentUser'] = user;
            res.json(user);
        });
    }

    function logout(req,res) {
        req.session.destroy();
        res.send(200);
    }
};