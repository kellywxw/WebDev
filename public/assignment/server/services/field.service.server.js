module.exports = function(app, fieldModel) {
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);
    app.put("/api/assignment/form/:formId/field", updateFields);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        fieldModel
            .createFieldForForm(formId, field)
            .then(
                function(fields) {
                    res.json(fields);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFieldsForForm(req, res) {
        var formId = req.params.formId;
        fieldModel
            .getFieldsForForm(formId)
            .then(
                function(fields) {
                    res.json(fields);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel
            .getFieldForForm(formId, fieldId)
            .then(
                function(field) {
                    res.json(field);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        fieldModel
            .updateField(formId, fieldId, field)
            .then(
                function(fields) {
                    res.json(fields);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFieldFromForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel
            .deleteFieldFromForm(formId, fieldId)
            .then(
                function(fields) {
                    res.json(fields);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFields (req, res) {
        var formId = req.params.formId;
        var startIndex = req.query.startIndex;
        var endIndex = req.query.endIndex;

        if(startIndex && endIndex) {
            fieldModel
                .sortField(formId, startIndex, endIndex)
                .then(
                    function(stat) {
                        return fieldModel.getFieldsForForm(formId);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(fields) {
                        res.json(fields);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );
        }
    }
}