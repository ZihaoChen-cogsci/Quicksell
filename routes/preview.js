
var i;
var data = require('../template1.json');
var form_data = require('../form_data.json');
// var preview_content = require('../preview_content.json');
exports.view = function(req, res){
  // get template id from url
  const templateId = req.params.id;

  console.log("form data", form_data);

  // pass template id and form fields to preview page
  res.render('preview', { templateId: templateId, templates: data.templates, formData: form_data["form_items"] });
};

// exports.generateImage = function(req, res) {
//   var canvas = request.body.canvas;
//   preview_content.canvas = canvas;
//   response.send(canvas);
// }