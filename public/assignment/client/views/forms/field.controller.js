(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, FieldService) {
        var model = this;
        model.addField = addField;
        model.updateField = updateField;
        model.selectField = selectField;
        model.deleteField = deleteField;
        model.getOptionText = getOptionText;

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
            if (fieldType == "single Line text") {
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

            } else if (fieldType == "radio buttons") {
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
                console.log(fields);
                model.fields = fields;
            };
        }


        function selectField(field) {
            model.selectedField = field;
            var fieldType = model.selectedField.type;
            if (fieldType == "OPTIONS" || fieldType == "CHECKBOXES" || fieldType == "RADIOS") {
                getOptionText();
                console.log(model.optionText);
            }
        }

        function updateField() {
            var fieldType = model.selectedField.type;
            if (fieldType == "OPTIONS" || fieldType == "CHECKBOXES" || fieldType == "RADIOS") {
                separateOptionText(model.newField);
                console.log(model.optionText);
            }
            FieldService
                .updateField(formId, model.selectedField._id, model.newField)
                .then(fieldUpdate);

            function fieldUpdate (fields) {
                model.fields = fields;
                model.newField = null;
            };

        }


        function getOptionText() {
            var text = [];
            var options = model.selectedField.options;
            for (var i = 0; i < options.length; i++) {
                var temp = options[i].label + ": " + options[i].value;
                text.push(temp);
            }
            model.optionText = text.join("\n");
        }

        function separateOptionText(newField) {
            var text = model.optionText;
            var output = [];
            var options = text.split("\n");
            console.log(options);
            for (var i = 0; i < options.length; i++) {
                var option = options[i].split(": ");
                var temp = {label: option[0], value: option[1]};
                output.push(temp);
            }
            newField.options = output;
            console.log(model.newField.options);
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
    }
})();
