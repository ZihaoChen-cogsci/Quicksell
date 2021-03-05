/*
 * GET form page.
 */
var template_data = require('../template_data.json');
var form_data = require('../form_data.json');

exports.view = function(req, res){
  template_data.templates[0].selected=true;
  console.log("in form view_____", form_data);
  // pass templateid and form data to form view
  res.render('form', {
    templateId: req.params.id,
    formFields: form_data["form_items"],
    newFields: form_data["new_form_items"],
    // newFieldsHTML: form_data["new_form_items_HTML"],
  });
};

exports.updateForm = function(request, response) {
  var formFields = request.body.formFields;
  // update json with new form fields
  form_data["form_items"] = formFields.originalFields;
  form_data["new_form_items"] = formFields.newFields;
  // form_data["new_form_items_HTML"] = formFields.newFieldsHTML;
  console.log("form data!!!", form_data);
  response.send(formFields);
}

exports.updateImage = function(request, response){
  // console.log(request.body.imageField);
  var imageFields = request.body.imageField;
  // console.log('passed images here: ');
  // console.log(imageFields);
  response.send(imageFields);
}

// exports.submitForm = function(request, response) {
//   response.send(formData);
// }
