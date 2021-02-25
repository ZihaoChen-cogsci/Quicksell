var data = require('../data.json');
exports.view = function(req, res){
    for (var i = 0; i < data.length; i++) {
    data.templates[i].selected=false;
  }
    console.log(data);
    res.render('library',data);
  };
