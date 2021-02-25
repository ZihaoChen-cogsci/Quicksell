/*
 * GET form page.
 */
var data = require('../data.json');
  exports.view = function(req, res){
    data.templates[0].selected=true;
    console.log(data);
    res.render('form',data);
  };
  exports.view2 = function(req, res){
    data.templates[1].selected=true;
    console.log(data);
    res.render('form',data);
};
  exports.view3 = function(req, res){
    data.templates[2].selected=true;
    console.log(data);
    res.render('form',data);
};
