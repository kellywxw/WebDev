module.exports = function(app) {
    var userModel = require("./models/user.model.js")(app);
    var eventModel = require("./models/event.model.js")(app);
    var eventfulModel = require("./models/eventful.model.js")(app);

    require("./services/user.service.server.js")(app, userModel);
    require("./services/event.service.server.js")(app, eventModel);
    require("./services/eventful.service.server.js")(app, eventfulModel);
};
