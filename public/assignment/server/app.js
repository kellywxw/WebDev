module.exports = function(app) {
    var userModel = require("./models/user.model.server.js")(app, mongoose, db);
    var formModel = require("./models/form.model.server.js")(app, mongoose, db);
    var fieldModel = require("./models/field.model.server.js")(app, mongoose, db);

    require("./services/user.service.server.js")(app, userModel);
    require("./services/form.service.server.js")(app, formModel);
    require("./services/field.service.server.js")(app, fieldModel);
};
