// 'use strict';

let i = 0;
var formFields = [];

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

function initializePage() {
	formFields = $("#form").serializeArray();
	console.log('initial form values!!', formFields);
	$("#add-field-button").click(onAddField);
}

function onAddField() {
	const fieldName = $("#new-field-label").val();
	const fieldInput = $("#new-field-input").val();

	$("#new-fields").append('<div id="new-field' + i + '" class="new-field-container"><div class="input-field" style="width: 38%;"><input id="new-field-label" class="input" type="text" name="new-field-label" placeholder="label (eg. color)"></div><div class="input-field" style="width: 52%;"><input id="new-field-input" class="input" type="text" name="new-field-input" placeholder="value (eg. brown)"></div><div style="width: 8%;" onclick="deleteField(' + i + ')">x</div></div>');

	i++;

	console.log({fieldName, fieldInput});

	formFields = $("#form").serializeArray();
}

function deleteField(deleteId) {
	console.log(deleteId);
	const id = "#new-field" + deleteId;
	
	$(id).remove();

	formFields = $("#form").serializeArray();
}

function onPreview(templateId) {
	console.log("templateId", templateId);

	$("#form").submit(function(e) {
		e.preventDefault();
		console.log("submitting");
		// var rsvpEmail = $("#rsvpEmail").val();
		formFields = $("#form").serializeArray();
		// console.log("rsvpEmail", rsvpEmail);
		$.post("/updateForm", { formFields: formFields }, postCallback);
	});

	// formFields = $("#form").serializeArray();
	console.log("updated form values!!!", formFields);
	const newPath = "/preview/" + templateId;
	window.location.href = newPath;
}

function postCallback(res) {
	alert("product information received!");
}
