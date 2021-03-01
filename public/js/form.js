'use strict';

let i = 0;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

function initializePage() {
	const formFields = $("#form").serializeArray();
	console.log("formFields!!!", formFields);
	$("#add-field-button").click(onAddField);
}

function onAddField() {
	const fieldName = $("#new-field-label").val();
	const fieldInput = $("#new-field-input").val();

	$("#new-fields").append('<div id="new-field' + i + '" class="new-field-container"><div class="input-field" style="width: 38%;"><input id="new-field-label" class="input" type="text" name="new-field-label" placeholder="label (eg. color)"></div><div class="input-field" style="width: 52%;"><input id="new-field-input" class="input" type="text" name="new-field-input" placeholder="value (eg. brown)"></div><div style="width: 8%;" onclick="deleteField(' + i + ')">x</div></div>');

	i++;

	console.log({fieldName, fieldInput});
}

function deleteField(deleteId) {
	console.log(deleteId);
	const id = "#new-field" + deleteId;
	
	$(id).remove();
}
