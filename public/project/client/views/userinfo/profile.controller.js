(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("ProfileController", ProfileController)

    function ProfileController($rootScope, $location, UserService, EvdbService, EventService, $routeParams) {
        var model = this;

        // profile
        model.update = update;
        model.unlike = unlike;
        model.addToEvents = addToEvents;
        model.deleteFromEvents = deleteFromEvents;

        // profileFriend
        model.follow = follow;
        model.unfollow = unfollow;

        model.added = [];
        model.addedId = [];

        var user = $rootScope.user;

        function loadLikedEventsForUser(userId) {
            UserService
                .getProfile(userId)
                .then(likedEventsLoad)
                .then (function () {
                    return EventService.findAllEventsForUser(user._id)
                })
                .then(eventsCompare);


            function likedEventsLoad(user) {
                model.user = user;
                model.likeEvents = user.likeEvents;
                formatEvents(user.likeEvents)
            }

            function eventsCompare (events) {
                for (var j = 0; j < model.likeEvents.length; j++) {
                    for (var i = 0; i < events.length; i++) {
                        if (events[i].title == model.likeEvents[j].title) {
                            model.added.push(j);
                            model.addedId.push(events[i]._id);
                        }
                    }
                }
            };
        }

        function formatEvents(events) {
            model.renderEvents = [];

            for(var i in events) {

                if(events[i].start) {
                    var start = moment(events[i].start).format('YYYY-MM-DD hh:mm A');
                } else {
                    var start = events[i].start;
                }

                if(events[i].end) {
                    var end = moment(events[i].end).format('YYYY-MM-DD hh:mm A')
                } else {
                    var end = events[i].end;
                }

                var event = {
                    poster: events[i].poster,
                    title : events[i].title,
                    location: events[i].location,
                    cost: events[i].cost,
                    evdbId: events[i].evdbId,
                    start: start,
                    end: end
                }

                console.log(events[i])
                console.log(event);

                model.renderEvents.push(event);
            }
        }

        function loadFollowForUser (userId) {
            UserService
                .getFollow(userId)
                .then(function(response){
                    model.user = response;
                    model.userFollows = response.userFollows;
                    model.userFollowsMe = response.userFollowsMe;
                    model.user.followsMe = response.followsMe;
                });
        }

        function init() {
            if($routeParams.id != null) {
                loadLikedEventsForUser($routeParams.id);
                loadFollowForUser ($routeParams.id);
            } else {
                loadLikedEventsForUser(user._id);
                loadFollowForUser (user._id);
            }
        }

        init();

        model.updatedUser = {
            username: user.username,
            password: user.password,
            firstName : user.firstName,
            lastName : user.lastName,
            email: user.email
        }

        function update() {
            if(user) {
                UserService
                    .updateUser(user._id, model.updatedUser)
                    .then(function (user) {
                        UserService.setCurrentUser(user);
                        $location.url("/profile");
                    });
            } else {
                $location.url("/login");
            }
        }

        function unlike(index, evdbId) {
            if(user) {
                model.likeEvents.splice(index,1);
                EvdbService
                    .userUnlikesEvent(user._id, evdbId);
            } else {
                $location.url("/login");
            }
        }


        function follow(user2) {
            if(user) {
                if(model.user) {
                    model.user.followsMe = [];
                    model.user.followsMe.push(user._id);
                }
                UserService
                    .meFollowsUser(user._id, user2);
            } else {
                $location.url("/login");
            }
        }

        function unfollow(userId2) {
            if(user) {
                if(model.user) {
                    model.user.followsMe = [];
                }
                UserService
                    .meUnfollowsUser(user._id, userId2);
            } else {
                $location.url("/login");
            }
        }

        function addToEvents(index, event) {
            var event = {
                poster: event.poster,
                title : event.title,
                location: event.location,
                start: event.start,
                end: event.end
            }

            EventService
                .createEventForUser(user._id, event)
                .then(eventAdd);

            function eventAdd (events) {
                model.added.push(index);
                console.log(events);
            };
        }

        function deleteFromEvents(index) {
            var i = model.added.indexOf(index);
            var eventId  = model.addedId[i];
            EventService
                .deleteEventById(eventId)
                .then(eventRemove);

            function eventRemove (events) {

                model.added.splice(i,1);
                model.addedId.splice(i,1);
                console.log(events);
            };
        }

    }
})();
