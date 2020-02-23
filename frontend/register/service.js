// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
// saveSubscription saves the subscription to the backend
const saveSubscription = async subscription => {
  const SERVER_URL = 'http://localhost:8080/save-subscription'
  const response = await fetch(SERVER_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  })
  return response.json()
}
self.addEventListener('install', event => {
  // cache a cat SVG
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', async () => {
  console.log('inside activate')
  // This will be called only once when the service worker is activated.
  try {
    const applicationServerKey = urlB64ToUint8Array(
      'BNTD7EmV5VdewPWIOuAKZHFvSfUy6iK_AaZsIqdcaHwBL1V_gY70bcmOGUtyqrZXyn4BvoxGTgn42SLUaskDP6o'
    )
    const options = { applicationServerKey, userVisibleOnly: true }
    const subscription = await self.registration.pushManager.subscribe(options)
    const response = await saveSubscription(subscription)
    console.log(response)
  } catch (err) {
    console.log('Error', err)
  }
})

self.addEventListener('push', function(event) {
  if (event.data) {
    console.log('Push event!! ', event.data.text())
    showLocalNotification('Hello from the other side', event.data.text(), self.registration)
  } else {
    console.log('Push event but no data')
  }
})

const showLocalNotification = (title, body, swRegistration) => {
  const options = {
    body:body,
    'title': 'palm test',
    'icon': 'http://palmmind.com/wp-content/uploads/2018/05/palmmindlogo.png',
    badge: "https://spyna.it/icons/android-icon-192x192.png",
    actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
    // 'url': 'http://localhost:4000'
    // here you can add more properties like icon, image, vibrate, etc.
  }
  swRegistration.showNotification(title, options)
}