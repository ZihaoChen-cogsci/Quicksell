
var i;
var data = require('../template1.json');
var form_data = require('../form_data.json');
exports.view = function(req, res){
  const templateId = req.params.id;

  res.render('preview', { templateId: templateId, templates: data.templates });
};