module.exports = function(app, model) {
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.get("/api/assignment/form", findAllForms);
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.put("//api/assignment/form/:formId", updateFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);


    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        var forms = model.createFormForUser(userId, form);
        res.json(forms);
    }

    function findAllForms(req, res) {
        var forms = model.findAllForms();
        res.json(forms);
    }

    function findAllFormsForUser(req, res) {
        var userId = req.params.userId;
        var forms = model.findAllFormsForUser(userId);
        res.json(forms);
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        var form = model.findFormById(formId);
        res.json(form);
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        model.updateFormById(formId, form);
        var forms = model.findAllForms();
        res.json(forms);
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        model.deleteFormById(formId);
        var forms = model.findAllForms();
        res.json(forms);
    }
}
