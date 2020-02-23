const check = () => {
    if (!('serviceWorker' in navigator)) {
      throw new Error('No Service Worker support!')
    }else{
     
    }
    if (!('PushManager' in window)) {
      throw new Error('No Push API Support!')
    }
  }
  const registerServiceWorker = async () => {
    const swRegistration = await navigator.serviceWorker.register('service.js')
    return swRegistration
  }
  const requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission()
    if (permission !== 'granted') {
      throw new Error('Permission not granted for Notification')
    }
  }
 
  

  window.addEventListener("load", async function(event) {
        // popup.postMessage("iframe inside","*");
        if(confirm("We want your permission to show notification")){
          main();
        }else{
          // close window or so
        }

    // can message back using event.source.postMessage(...)
  });
  const main = async () => {
    check()
    alert('hello')
    const swRegistration = await registerServiceWorker()
    const permission = await requestNotificationPermission()
  }
  // main(); we will not call main in the beginning.