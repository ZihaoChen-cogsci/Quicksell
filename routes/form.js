/*
 * GET form page.
 */
var template_data = require('../template_data.json');
var form_data = require('../form_data.json');
var saved_forms = require('../saved_forms.json');

var templateId = 0;
var conditionSelections = [
  { value: "new", text: "New" },
  { value: "like new", text: "Like New" },
  { value: "good", text: "Good" },
  { value: "fair", text: "Fair" },
  { value: "poor", text: "Poor" },
];

var dimensionSelections = [
  { value: "cm", text: "centimenter (CM)" },
  { value: "m", text: "meter (M)" },
  { value: "inch", text: "inch (IN)" },
  { value: "foot", text: "foot (FT)" },
];

exports.view = function(req, res){
  template_data.templates[0].selected=true;
  console.log("in form view_____", form_data["form_items"]);

  var cond = form_data["form_items"][6].value;
  var conditions = conditionSelections;

  if(cond.length > 0) {
    conditions = conditions.map((c) => {
      var newC = { value: c.value, text: c.text };
      if(cond == c.value) {
        newC.selected = true;
      }
      return newC;
    });
    console.log('conditions', conditions);
  }

  var dim = form_data["form_items"][2].value;
  var dimensions = dimensionSelections;

  if(dim.length > 0) {
    dimensions = dimensions.map((d) => {
      var newD = { value: d.value, text: d.text };
      if(dim == d.value) {
        newD.selected = true;
      }
      return newD;
    });
    console.log('dimensions', dimensions);
  }
  
  // pass templateid and form data to form view
  templateId = req.params.id;
  res.render('form', {
    templateId,
    formFields: form_data["form_items"],
    newFields: form_data["new_form_items"],
    saveInd: form_data["save_ind"],
    conditions: conditions,
    dimensions: dimensions,
  });
};

exports.updateForm = function(request, response) {
  var formFields = request.body.formFields;
  // update json with new form fields
  form_data["form_items"] = formFields.originalFields;
  form_data["new_form_items"] = formFields.newFields;
  console.log("form data!!!", form_data);
  response.send(formFields);
}

exports.updateImage = function(request, response){
  var imageFields = request.body.imageField;
  response.send(imageFields);
}

exports.saveForm = function(request, response) {
  var formFields = request.body.formFields;
  var saveInd = request.body.saveInd;

  var dt = new Date();
  var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
  formFields["timestamp"] = time;
  formFields['template'] = templateId;

  // if has saved index, then this form has been saved before, replace the old data
  if (saveInd) {
    saved_forms["saved_forms"] = saved_forms["saved_forms"].filter((form) => form["save_ind"] !== saveInd);
    formFields['saveInd'] = saveInd; // use the same save index as before
  }

  saved_forms["saved_forms"].push(formFields);

  response.send(formFields);
}
