var i;
var template_data = require('../template_data.json');
exports.view = function(req, res){
  console.log('template', template_data);

  for (i = 0; i < 3; i++) {
    template_data.templates[i].selected=false;
  }
    res.render('library', template_data);
  };
