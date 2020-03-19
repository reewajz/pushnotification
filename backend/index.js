
if (window.requestIdleCallback) {
  requestIdleCallback(function () {
      fingerprint()
  })
} else {
  setTimeout(function () {
      fingerprint()
  }, 500)
}
function fingerprint() {
  var options = {
    preprocessor: null,
    audio: {
      timeout: 1000,
      // On iOS 11, audio context can only be used in response to user interaction.
      // We require users to explicitly enable audio fingerprinting on iOS 11.
      // See https://stackoverflow.com/questions/46363048/onaudioprocess-not-called-on-ios11#46534088
      excludeIOS11: true
    },
    fonts: {
      swfContainerId: 'fingerprintjs2',
      swfPath: 'flash/compiled/FontList.swf',
      userDefinedFonts: [],
      extendedJsFonts: false
    },
    screen: {
      // To ensure consistent fingerprints when users rotate their mobile devices
      detectScreenOrientation: true
    },
    plugins: {
      sortPluginsFor: [/palemoon/i],
      excludeIE: false
    },
    extraComponents: [],
    excludes: {
      // Unreliable on Windows, see https://github.com/Valve/fingerprintjs2/issues/375
      'enumerateDevices': true,
      // devicePixelRatio depends on browser zoom, and it's impossible to detect browser zoom
      'pixelRatio': true,
      // DNT depends on incognito mode for some browsers (Chrome) and it's impossible to detect incognito mode
      'doNotTrack': true,
      // uses js fonts already
      'fontsFlash': true
    },
    NOT_AVAILABLE: 'not available',
    ERROR: 'error',
    EXCLUDED: 'excluded'
  }
  Fingerprint2.get(options,function (components) {
    var values = components.map(function (component) { return component.value })
    var murmur = Fingerprint2.x64hash128(values.join(''), 31)
    console.log(murmur,"hash") 
  })  
}


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