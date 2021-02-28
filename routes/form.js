/*
 * GET form page.
 */
var template_data = require('../template_data.json');
exports.view = function(req, res){
  template_data.templates[0].selected=true;
  console.log('req!!!', req.params);
  res.render('form', template_data);
};
//   exports.view2 = function(req, res){
//     template_data.templates[1].selected=true;
//     console.log(template_data);
//     res.render('form', template_data);
// };
//   exports.view3 = function(req, res){
//     template_data.templates[2].selected=true;
//     console.log(template_data);
//     res.render('form', template_data);
// };
