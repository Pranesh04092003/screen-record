self.addEventListener('install', event => {
  console.log('Service Worker installed');
});

self.addEventListener('activate', event => {
  console.log('Service Worker activated');
});

self.addEventListener('message', event => {
  if (event.data.type === 'startRecording') {
      self.streamId = event.data.streamId;
  }
});

self.addEventListener('fetch', event => {
  // Intercept fetch events if needed
});
