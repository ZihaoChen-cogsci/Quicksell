exports.view = function(req, res){
  const templateId = req.params.id;

  res.render('share', { templateId: templateId });
};
