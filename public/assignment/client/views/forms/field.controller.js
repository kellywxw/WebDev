(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, FormService, FieldService) {
        var model = this;
        model.addField = addField;
        model.cloneField = cloneField;
        model.updateField = updateField;
        model.selectField = selectField;
        model.deleteField = deleteField;
        model.sortField = sortField;

        var userId = $routeParams.userId;
        var formId = $routeParams.formId;

        function loadForm() {
            FormService
                .findFormById(formId)
                .then(formLoad);

            function formLoad (form) {
                model.form = form;
            };
        }

        function loadFieldsForForm() {
            FieldService
                .getFieldsForForm(formId)
                .then(fieldsLoad);

            function fieldsLoad (fields) {
                console.log(fields);
                model.fields = fields;
            };
        }

        loadForm();
        loadFieldsForForm();

        function addField(fieldType) {
            var field = {};
            if (fieldType == "single Line text") {
                field = {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
            } else if (fieldType == "multi line text") {
                field = {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
            } else if (fieldType == "email") {
                field = {"label": "New Email Field", "type": "EMAIL", "placeholder": "New Field"};
            } else if (fieldType == "password") {
                field = {"label": "New Password Field", "type": "PASSWORD", "placeholder": "New Field"};
            } else if (fieldType == "date") {
                field = {"label": "New Date Field", "type": "DATE"};
            } else if (fieldType == "dropdown") {
                field =
                {"label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]}

            } else if (fieldType == "checkboxes") {
                field =
                {"label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]}

            } else if (fieldType == "radio buttons") {
                field =
                {"label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]}
            }

            FieldService
                .createFieldForForm(formId, field)
                .then(fieldCreate);

            function fieldCreate (fields) {
                console.log(fields);
                model.fields = fields;
            };
        }

        function cloneField(field) {
            var clonedField = {"label": field.label, "type": field.type,
                "placeholder": field.placeholder, "options": field.options};

            FieldService
                .createFieldForForm(formId, clonedField)
                .then(fieldCreate);

            function fieldCreate (fields) {
                console.log(fields);
                model.fields = fields;
            };
        }

        function selectField(field) {
            model.selectedField = field;
            var selectedField = model.selectedField;
            var fieldType = model.selectedField.type;
            var fieldId = selectedField._id;
            var label = selectedField.label;
            var placeholder =  selectedField.placeholder;

            if (fieldType == "OPTIONS" || fieldType == "CHECKBOXES" || fieldType == "RADIOS") {
                appendOptionText();
                model.newField = {
                    "_id": fieldId,
                    "label": label,
                    "type": fieldType,
                    "placeholder": placeholder,
                    "options": separateOptionText()
                };
            } else {
                model.newField = {
                    "_id": fieldId,
                    "label": label,
                    "type": fieldType,
                    "placeholder": placeholder
                };
            }
        }

        function updateField() {
            var fieldType = model.selectedField.type;
            var fieldId = model.selectedField._id;
            if (fieldType == "OPTIONS" || fieldType == "CHECKBOXES" || fieldType == "RADIOS") {
                model.newField.options = separateOptionText();
            }

            FieldService
                .updateField(formId, fieldId, model.newField)
                .then(fieldUpdate);

            function fieldUpdate (fields) {
                console.log(fields);
                model.fields = fields;
                model.newField = null;
            };

        }

        function appendOptionText() {
            var text = [];
            var options = model.selectedField.options;
            for (var i = 0; i < options.length; i++) {
                var temp = options[i].label + ": " + options[i].value;
                text.push(temp);
            }
            model.optionText = text.join("\n");
        }

        function separateOptionText() {
            var text = model.optionText;
            var output = [];
            var options = text.split("\n");
            for (var i = 0; i < options.length; i++) {
                var option = options[i].split(": ");
                var temp = {label: option[0], value: option[1]};
                output.push(temp);
            }
            return output;
        }

        function deleteField(field) {
            FieldService
                .deleteFieldFromForm(formId, field._id)
                .then(fieldDelete);

            function fieldDelete (fields) {
                console.log(fields);
                model.fields = fields;
            };
        }

        function sortField(start, end) {
            FieldService
                .sortField(formId, start, end)
                .then(
                    function (response) {
                        console.log(response);
                        model.fields = response;
                    },
                    function (err) {
                        model.error = err;
                    }
                );
        }
    }
})();
