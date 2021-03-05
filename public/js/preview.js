$(document).ready(function() {
	initializePage();
})

function initializePage() {
	
}

function onSave(templateId) {
	console.log('templateId', templateId);
	html2canvas($('#preview-content'),{
    onrendered: function (canvas) {  
      // document.body.appendChild(canvas);


			console.log('canvas', canvas);

			// $.post("/generateImage", { canvas: canvas });

			// $.post("/generateImage", { canvas: canvas }, function() {
			// 	console.log('saved to json', canvas);
				let newPath = '/share/' + templateId;
				window.location.href = newPath;
				$('#content').append(canvas);

			// });
      
        // var imgString = canvas.toDataURL("image/png");
        // var a = document.createElement('a');
        // a.href = imgString;
        // a.download = "image.png";
        // document.body.appendChild(a);
        // a.click();
        // document.body.removeChild(a);              
		},
	});
}
