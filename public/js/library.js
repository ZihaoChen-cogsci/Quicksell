function addnum(n) {
  picshw(picnum += n);
}
function picshw(n) {
  var pic = document.getElementsByClassName("tempic");
  if (n > pic.length) {picnum = 1}
  if (n < 1) {picnum = pic.length}
  for (var i = 0; i < pic.length; i++) {
    pic[i].style.display = "none";
  }
  pic[picnum-1].style.display = "block";
}
