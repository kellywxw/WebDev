var q = require("q");

module.exports = function(mongoose, db) {
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('ChopChopUser', UserSchema);

    var api = {
        createUser : createUser,
        findAllUsers : findAllUsers,
        findUsersByIds: findUsersByIds,
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        updateUser : updateUser,
        deleteUser : deleteUser,
        userLikesEvent: userLikesEvent
    };
    return api;

    function createUser(user) {
        var deferred = q.defer();

        UserModel.create(user, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                UserModel.find(function (err, users) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(users);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();

        UserModel.find(function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

    function findUsersByIds(userIds) {
        var deferred = q.defer();

        // find all users in array of user IDs
        UserModel.find(
            {_id: {$in: userIds}},
            function (err, users) {
                if (err) {
                    console.log("failed:user model findUsersByIds:");
                    deferred.reject(err);
                } else {
                    console.log("user model findUsersByIds:");
                    console.log(users);
                    deferred.resolve(users);
                }
        });

        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();

        UserModel.findById(userId, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();

        UserModel.findOne({username: username}, function(err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        UserModel.findOne(
            {username: credentials.username,
             password: credentials.password},

            function(err, user) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function updateUser(userId, updatedUser) {

        var deferred = q.defer();

        UserModel.findByIdAndUpdate(userId, updatedUser, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                UserModel.find(function (err, users) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(users);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();

        UserModel.findByIdAndRemove(userId, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                UserModel.find(function (err, users) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(users);
                    }
                });
            }
        });

        return deferred.promise;
    }

    // add event to user likes
    function userLikesEvent (userId, event) {

        var deferred = q.defer();

        // find the user
        UserModel.findById(userId, function (err, doc) {
            console.log(123);

            // reject promise if error
            if (err) {
                console.log("failed: add event to user.likes ");
                console.log(err);
                deferred.reject(err);
            } else {
                console.log("add event to user.likes");
                console.log(doc);
                // add event id to user likes
                doc.likes.push (event.evdbId);

                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {
                        console.log("user model userLikesEvent:");
                        console.log(doc);
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred;
    }
}

