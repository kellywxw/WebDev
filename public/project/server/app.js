module.exports = function(app, mongoose, db) {
    var chopchopUserModel = require("./models/user.model.server.js")(mongoose, db);
    var eventModel = require("./models/event.model.server.js")(mongoose, db);
    var evdbModel = require("./models/eventful.model.server.js")(mongoose, db);

    require("./services/user.service.server.js")(app, chopchopUserModel,evdbModel);
    require("./services/event.service.server.js")(app, eventModel);
    require("./services/eventful.service.server.js")(app, evdbModel, chopchopUserModel);
};
