var q = require("q");

module.exports = function(app, mongoose, db) {
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        createUser : createUser,
        findAllUsers : findAllUsers,
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        updateUser : updateUser,
        deleteUser : deleteUser
    };
    return api;

    function createUser(user) {
        var deferred = q.defer();

        UserModel.create(user, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                UserModel.find(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();

        UserModel.find(function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();

        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();

        UserModel.findOne({username: username}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        UserModel.findOne(
            {username: credentials.username,
             password: credentials.password},

            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    function updateUser(userId, updatedUser) {
        var deferred = q.defer();

        UserModel.findByIdAndUpdate(userId, updatedUser, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                UserModel.find(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();

        UserModel.findByIdAndRemove(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                UserModel.find(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }
}

