/*
 * GET form page.
 */
var data = require('../data.json');
/*var pic = driver.findElements(By.className('tempic'));*/
/*exports.view = function(req, res){
    for (var i = 0; i < data.length; i++) {
      if (pic[i].style.display=='block') {
        data.templates[i].selected=true;
      }
      console.log(data);
      res.render('form',data);
    } */
    exports.view = function(req, res){
    console.log(data);
    res.render('form',data);
  };
