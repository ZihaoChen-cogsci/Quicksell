$(document).ready(function() {
  $('#cmd').click(function () {
    pdf();
      //  capture();
  });         
});

function pdf()
{
    var doc = new jsPDF();
    var specialElementHandlers = {
        '#editor': function (element, renderer) {
            return true;
        }
    };      
    doc.fromHTML($('#content').html(), 15, 15, {
        'width': 170,
            'elementHandlers': specialElementHandlers
    });
    doc.save('sample-file.pdf');            
} 

function capture() {
  html2canvas($('#content'),{
    onrendered: function (canvas) {  
      document.body.appendChild(canvas);
      
        // var imgString = canvas.toDataURL("image/png");
        // var a = document.createElement('a');
        // a.href = imgString;
        // a.download = "image.png";
        // document.body.appendChild(a);
        // a.click();
        // document.body.removeChild(a);              
  },
  // width: 400,
  // height: 400
});
}
