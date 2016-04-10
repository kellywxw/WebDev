var q = require("q");

module.exports = function(mongoose, db) {
    var ChopChopUserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('ChopChopUser', ChopChopUserSchema);

    var api = {
        createChopChopUser : createChopChopUser,
        findAllChopChopUsers : findAllChopChopUsers,
        findChopChopUsersByIds: findChopChopUsersByIds,
        findChopChopUserById : findChopChopUserById,
        findChopChopUserByUsername : findChopChopUserByUsername,
        findChopChopUserByCredentials : findChopChopUserByCredentials,
        updateChopChopUser : updateChopChopUser,
        deleteChopChopUser : deleteChopChopUser,
        userLikesEvent: userLikesEvent,
        userUnlikesEvent : userUnlikesEvent
    };
    return api;

    function createChopChopUser(user) {
        var deferred = q.defer();

        UserModel.create(user, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function findAllChopChopUsers() {
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

    function findChopChopUsersByIds(userIds) {
        var deferred = q.defer();

        // find all users in array of user IDs
        UserModel.find(
            {_id: {$in: userIds}},
            function (err, users) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(users);
                }
        });

        return deferred.promise;
    }

    function findChopChopUserById(userId) {
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

    function findChopChopUserByUsername(username) {
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

    function findChopChopUserByCredentials(credentials) {
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

    function updateChopChopUser(userId, updatedUser) {
        var deferred = q.defer();

        UserModel.findByIdAndUpdate(userId, updatedUser, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function deleteChopChopUser(userId) {
        var deferred = q.defer();

        UserModel.findByIdAndRemove(userId, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    // add event to user.likes
    function userLikesEvent (userId, event) {

        var deferred = q.defer();

        // find the user
        UserModel.findById(userId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                // add event id to user likes
                var index = doc.likes.indexOf(event.evdbId);
                if(index == -1) {
                    doc.likes.push(event.evdbId);
                }
                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred;
    }

    // remove event from user.likes
    function userUnlikesEvent (userId, evdbId) {

        var deferred = q.defer();

        // find the user
        UserModel.findById(userId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                // remove event id from user.likes
                var index = doc.likes.indexOf(evdbId);
                doc.likes.splice(index,1);
                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred;
    }
}

