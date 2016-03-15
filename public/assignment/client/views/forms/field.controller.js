(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, FieldService) {
        var model = this;
        model.addField = addField;
        model.updateField = updateField;
        model.deleteField = deleteField;

        var userId = $routeParams.userId;
        var formId = $routeParams.formId;

        function loadFieldsForForm() {
            FieldService
                .getFieldsForForm(formId)
                .then(fieldsLoad);

            function fieldsLoad (fields) {
                model.fields = fields;
            };
        }

        loadFieldsForForm();

        function addField(fieldType) {
            var field = {};
            if (fieldType == "single line text") {
                field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
            } else if (fieldType == "multi line text") {
                field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
            } else if (fieldType == "date") {
                field = {"_id": null, "label": "New Date Field", "type": "DATE"};
            } else if (fieldType == "dropdown") {
                field =
                {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]}

            } else if (fieldType == "checkboxes") {
                field =
                {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]}

            } else {
                field =
                {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]}
            }

            FieldService
                .createFieldForForm(formId, field)
                .then(fieldCreate);

            function fieldCreate (fields) {
                model.fields = fields;
            };
        }

        function updateField(formId, fieldId, field) {
            FieldService
                .updateField(formId, fieldId, field)
                .then(fieldUpdate);

            function fieldUpdate (fields) {
                model.fields = fields;
            };
        }

        function deleteField(field) {
            FieldService
                .deleteFieldFromForm(formId, field._id)
                .then(fieldDelete);

            function fieldDelete (fields) {
                model.fields = fields;
            };
        }
    }
})();
