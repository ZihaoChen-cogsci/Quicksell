
var i;
var data = require('../template1.json');
exports.view = function(req, res){
  //handleModal();
  for (i = 0; i < 3; i++) {
    data.templates[i].selected=false;
  }

  res.render('preview', data);
};

// function handleModal() {

// }