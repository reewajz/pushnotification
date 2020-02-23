function receiveMessage(event)
{
  var notificationtousr;
  // Do we trust the sender of this message?  (might be
  // different from what we originally opened, for example).
  // if (event.origin !== "http://localhost:8080")
  //   return;
  if(confirm("We want your permission to show notification")){
    notificationtousr=true
  // iframe.contentWindow.postMessage('new page', 'http://localhost:8080');


  }else{
    notificationtousr=false
  }
  // event.source is popup
  // event.data is "hi there yourself!  the secret response is: rheeeeet!"
}
// window.addEventListener("load", receiveMessage, false);

document.getElementById("subscribe").onclick = function() {
  var focuswin=window.open('http://localhost:8080/register');
  focuswin.focus();
  // iframe.contentWindow.postMessage(this.message.value, 'http://localhost:8080');
  return false;
};