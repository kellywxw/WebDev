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
        userUnlikesEvent : userUnlikesEvent,

        meFollowsUser_me: meFollowsUser_me,
        meUnFollowsUser_me : meUnFollowsUser_me,
        meFollowsUser_user : meFollowsUser_user,
        meUnFollowsUser_user : meUnFollowsUser_user

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


    // add user2._id to user1.follows
    function meFollowsUser_me (userId1, user2) {

        var deferred = q.defer();

        // find the user1
        UserModel.findById(userId1, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                // add user2 id to user1 follows
                var index = doc.follows.indexOf(user2._id);
                if(index == -1) {
                    doc.follows.push(user2._id);
                }
                // save user1
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

    // remove userId2 from user1.follows
    function meUnFollowsUser_me (userId1, userId2) {

        var deferred = q.defer();

        // find the user1
        UserModel.findById(userId1, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                // remove userId2 from user1.follows
                var index = doc.follows.indexOf(userId2);
                doc.follows.splice(index,1);
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

    // add userId1 to user2.followsMe
    function meFollowsUser_user (userId1, user2) {

        var deferred = q.defer();

        // find the user by user2.id
        UserModel.findById(user2._id, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }

                // if there's a user2
                if (doc) {
                    // add userId1 to user2.followsMe
                    var index = doc.followsMe.indexOf(userId1);
                    if(index == -1) {
                        doc.followsMe.push(userId1);
                    }
                    // save changes
                    doc.save(function(err, doc){
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

    // remove userId1 from user2.followsMe
    function meUnFollowsUser_user (userId1, userId2) {

        var deferred = q.defer();

        // find the user2 by userId2
        UserModel.findById(userId2, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }

                // if there's a user2
                if (doc) {
                    // remove userId1 from user2.followsMe
                    var index = doc.followsMe.indexOf(userId1);
                    doc.followsMe.splice(index,1);
                    // save changes
                    doc.save(function(err, doc){
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

