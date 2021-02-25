var i;
var data = require('../data.json');
exports.view = function(req, res){
    for (i = 0; i < 3; i++) {
    data.templates[i].selected=false;
  }
    console.log(data);
    res.render('library',data);
  };
