// redirect to secure connection
location.protocol === 'http:' && (location.protocol = 'https:');

// check if service workers are available
if ('serviceWorker' in navigator) {
  // register the service worker
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'));
  // enable "add to home screen" button
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    const prompt = document.querySelector('#install-prompt');
    prompt.style.display = 'block';
    prompt.onclick = () => e.prompt();
  });
}