module.exports = function(app, mongoose, db, chopchopUserModel) {
    var userModel = require("./models/user.model.server.js")(mongoose, db);
    var formModel = require("./models/form.model.server.js")(mongoose, db);
    var fieldModel = require("./models/field.model.server.js")(mongoose, db, formModel);

    require("./services/user.service.server.js")(app, userModel, chopchopUserModel);
    require("./services/form.service.server.js")(app, formModel);
    require("./services/field.service.server.js")(app, fieldModel);
};
