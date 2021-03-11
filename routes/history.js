var saved_forms = require('../saved_forms.json');
var form_data = require('../form_data.json');

exports.view = function(req, res){
  console.log('saved_forms', saved_forms);

  res.render('history', { savedForms: saved_forms["saved_forms"] });
};

exports.restoreForm = function(req, res) {
  // var formFields = request.body.formFields;
  var index = req.body.index;
  var saveInd = req.body.saveInd;
  const formFields = saved_forms["saved_forms"][index];

  // if restored from saved forms, give it a save index
  saved_forms["saved_forms"][index]["save_ind"] = saveInd;

  form_data["form_items"] = formFields.originalFields;
  form_data["new_form_items"] = formFields.newFields;
  form_data["save_ind"] = saveInd;
  res.send(saved_forms["saved_forms"][index]);
}
