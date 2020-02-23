  const check = () => {
    if (!('serviceWorker' in navigator)) {
      throw new Error('No Service Worker support!')
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

  window.addEventListener("message", async function(event) {
    console.log(event,"event of iframe")

    if (event.origin != 'http://localhost:4000') {
      return;
    }
    window.open('http://localhost:8080/register');

        // popup.postMessage("iframe inside","*");
  // const swRegistration = await registerServiceWorker()
  //   const permission = await requestNotificationPermission()
  // alert( "received: " + event.data );
  
    // can message back using event.source.postMessage(...)
  });
  const main = async () => {
    check()
    // const swRegistration = await registerServiceWorker()
    // const permission = await requestNotificationPermission()
  }
  // main(); we will not call main in the beginning.