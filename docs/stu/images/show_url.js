



function write_document(str) {
  document.write(str);
}
///
function build_gif_url() {
  var nn_now = new Date();
  var nn_title;
  if (!window.encodeURI) {
    nn_title = escape(document.title);
  } else {
    nn_title = window.encodeURI(document.title);
  }
  var nn_imageUrl =
    "http://219.133.38.14/cgi-bin/view" +    
    "?u=" + escape(document.URL);
  return nn_imageUrl;
}
///
function send_backgif(url) {
  if (document.images) {
    var nn_image = new Image();
    nn_image.src = url;
  } else {
    write_document("<img src='" + url + "' height='1' width='1'>");
  }
}
///
function get_gif() {
  send_backgif(build_gif_url());
}
///
function my_main() 
{
	   get_gif();  
}
my_main();

