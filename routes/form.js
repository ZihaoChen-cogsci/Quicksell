/*
 * GET form page.
 */
var template_data = require('../template_data.json');
var form_data = require('../form_data.json');

exports.view = function(req, res){
  template_data.templates[0].selected=true;
  console.log("in form view_____");
  // pass templateid and form data to form view
  res.render('form', { templateId: req.params.id, formFields: form_data["form_items"] });
};

exports.updateForm = function(request, response) {
  var formFields = request.body.formFields;
  // update json with new form fields
  form_data["form_items"] = formFields;
  console.log("form data!!!", form_data["form_items"]);
  response.send(formFields);
}

// exports.submitForm = function(request, response) {
//   response.send(formData);
// }
