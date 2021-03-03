/*
 * GET form page.
 */
var template_data = require('../template_data.json');
var form_data = require('../form_data.json');
exports.view = function(req, res){
  template_data.templates[0].selected=true;
  console.log("in form view_____", form_data["form_items"]);
  res.render('form', { templateId: req.params.id, formFields: form_data["form_items"] });
};

exports.updateForm = function(request, response) {
  var formFields = request.body.formFields;
  form_data["form_items"] = formFields;
  console.log("form data!!!", form_data["form_items"]);
  response.send(formFields);
}

exports.submitForm = function(request, response) {
  response.send(formData);
}
