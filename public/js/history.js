let saveInd = 1;

$(document).ready(function() {
});

function onSelectForm(restoreInd) {
  $.post("/restoreForm", { index: restoreInd, saveInd }, function(res) {
    console.log('res', res.template, res.saveInd);
    alert("Form restored! You can continue editing.");
    saveInd++;
    window.location.href= "/form/" + res.template;
  });
}