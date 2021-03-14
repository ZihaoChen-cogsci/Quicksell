// 'use strict';

let i = 0;

var formFields = {
	originalFields: [],
	newFields: [],
};

var dimension, condition;

let map = new Map();

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

function initializePage() {
	/*.serializeArray(): creates a JS array of objects, ready to
	be encoded as a JSON string. It operates on a jQuery collection
	of forms or form control.
	*/
	formFields.originalFields = $("#form").serializeArray();
	console.log('initial form values!!', formFields);
	$("#add-field-button").on("click", onAddField);
	// $("#save").on("click", saveForLater);
}

function onAddField() {
	const newFieldHTML = '<div id="new-field' + i + '" class="new-field-container"><div class="input-field" style="width: 38%;"><label for="new-field-input"><input id="new-field-label" class="input" type="text" name="new-field-label" placeholder="label (eg. color)"><label></div><div class="input-field" style="width: 52%;"><input id="new-field-input" class="input" type="text" name="new-field-input" placeholder="value (eg. brown)"></div><div style="width: 8%;" onclick="deleteField(' + i + ')">x</div></div>';
	$("#new-fields").append(newFieldHTML);

	i++;
}

function restoreAddedFields(name, value) {
	console.log("name value", name, value);
	const field = '<div id="new-field' + i + '" class="new-field-container"><div class="input-field" style="width: 38%;"><label for="new-field-input"><input id="new-field-label" class="input" type="text" name="new-field-label" placeholder="label (eg. color)" value="' + name + '"><label></div><div class="input-field" style="width: 52%;"><input id="new-field-input" class="input" type="text" name="new-field-input" placeholder="value (eg. brown)" value="' + value + '"></div><div style="width: 8%;" onclick="deleteField(' + i + ')">x</div></div>';
	// $("#new-fields").append(field);
	i++;

	return field;
}

function deleteField(deleteId) {
	const id = "#new-field" + deleteId;
	console.log("id", id);
	
	$(id).remove();
}

function deleteFieldNoArg(deleteId) {
	console.log('deleteId', deleteId);
	$(deleteId).remove();
}

function onSubmit() {
	var newField = {
		name: '',
		value: '',
	};

	// get the new form fields and separate out the custom fields
	formFields.originalFields = $("#form").serializeArray().filter((field) => {
		if(!(field.name == 'new-field-label' || field.name == 'new-field-input')) {
			return true;
		}

		if(field.name == 'new-field-label') {
			newField = {};
			newField.name = field.value;
		}

		if(field.name == 'new-field-input') {
			newField.value = field.value;
			map.set(newField.name, newField.value);
		}

		if(field.name == 'dimension') {
			dimension = field.value;
		}

		if(field.name == 'condition') {
			condition = field.value;
		}
		return false;
	});

	console.log("fileds", $("#form").serializeArray());

	// convert map to array

	formFields.newFields = Array.from(map, ([name, value]) => ({ name, value }));
}

// when users submit
function onPreview(templateId) {
	console.log("templateId", templateId);

	$("#form").submit(function(e) {
		e.preventDefault();
	});

	if(!checkIfComplete()) {
		if(!confirm("There are some empty fields in the form, do you still want to proceed?")) {
			return;
		}
	}

	onSubmit();
	
	// send the form fields to routes/form.js, which updates json
	$.post("/updateForm", { formFields: formFields }, postCallback);

	// navigate(jump) to preview page
	const newPath = "/preview/" + templateId;
	window.location.href = newPath;
}

function checkIfComplete() {
	const formFields = $("#form").serializeArray();
	for(var i = 0; i < formFields.length; i++) {
		const field = formFields[i];
		if(!field.value || field.value == '' || field.value.length == 0) {
			console.log('field is empty return false');
			return false;
		}
	}
	console.log('return true');

	return true;
}

function postCallback(res) {
	alert("product information received!");
}

function saveForLater(saveInd) {
	$("#form").submit(function(e) {
		e.preventDefault();
	});

	onSubmit();

	$.post("/saveForm", { formFields, saveInd }, function() {
		console.log('form fields', formFields);
		alert("saved successfully!");
	});

	window.location.href = "/index";
}
