// 'use strict';

let i = 0;
var formFields = {
	originalFields: [],
	newFields: [],
};

let map = new Map();
let HTMLmap = new Map();

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
}

function onAddField() {
	const newFieldHTML = '<div id="new-field' + i + '" class="new-field-container"><div class="input-field" style="width: 38%;"><label for="new-field-input"><input id="new-field-label" class="input" type="text" name="new-field-label" placeholder="label (eg. color)"><label></div><div class="input-field" style="width: 52%;"><input id="new-field-input" class="input" type="text" name="new-field-input" placeholder="value (eg. brown)"></div><div style="width: 8%;" onclick="deleteField(' + i + ')">x</div></div>';
	$("#new-fields").append(newFieldHTML);
	
	// const id = "#remove-button" + i;
	
	// HTMLmap.set(i, newFieldHTML);

	// $(id).on("click", function() {
	// 	console.log("remove element");
	// 	$(this).parent().remove();
	// })

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

	// HTMLmap.remove(deleteId);
	// $(this).parent().remove();


	// remove this field from newFields
	// formFields.newFields.splice(deleteId);
}

function deleteFieldNoArg(deleteId) {
	// const deleteId = e.target.getAttribute('deleteId');
	console.log('deleteId', deleteId);
	$(deleteId).remove();
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

	var newField = {
		name: '',
		value: '',
	};

	console.log("form values___", $("#form").serializeArray());

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
		return false;
	});

	// convert map to array
	formFields.newFields = Array.from(map, ([name, value]) => ({ name, value }));
	// formFields.newFieldsHTML = Array.from(HTMLmap, ([id, html] ))
	
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
