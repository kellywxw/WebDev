module.exports = function(app, model) {
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);


    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var fields = model.createFieldForForm(formId, field);
        res.json(fields);
    }

    function getFieldsForForm(req, res) {
        var formId = req.params.formId;
        var fields = model.getFieldsForForm(formId);
        res.json(fields);
    }

    function getFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = model.getFieldForForm(formId, fieldId);
        res.json(field);
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        var fields = model.updateField(formId, fieldId, field);
        res.json(fields);
    }

    function deleteFieldFromForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = model.deleteFieldFromForm(formId, fieldId);
        res.json(fields);
    }
}