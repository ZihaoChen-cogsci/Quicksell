
/*
 * Function that is called when the "upload picture" button is clicked.
 */
function UploadPicture() {
    /*!!Important: use off() can avoid onclick() running multiple times!!
    .off() before .on(): remove all event handlers;
    另一种方法: .one() replaces of .on(): handles one event at once.
    */
    $('#file').off().on('change', function () {
        imagesPreview(this, 'div.gallery');
    });
}

function imagesPreview(input, placeToInsertImagePreview) {
    if (input.files) {
        var filesAmount = input.files.length;
        console.log("the number of files is " + filesAmount);
        
            for (i = 0; i < filesAmount; i++) {
                /*FileReaderWeb application object allows asynchronous read files 
                stored on the user's computer (or raw data buffer) of the content.
                Returns a newly constructed one FileReader.
                */
                var reader = new FileReader();
                //FileReader.onload:This event is triggered when the read operation is complete.
                reader.onload = function (event) {
                    //event.target.result
                    $($.parseHTML('<img>')).attr({ 'src': event.target.result, 'width': '200'
                }).css('margin-right', 10).appendTo(placeToInsertImagePreview);
                }
                //FileReader 读取文件的方式为readAsDataURL: result contains a data of what we read the file.
                reader.readAsDataURL(input.files[i]);
            }

    }
};