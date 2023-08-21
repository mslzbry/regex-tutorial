const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    window.deferredPrompt = event;
    // show button
    butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    // display prompt
    promptEvent.prompt();
    window.deferredPrompt = null;
    // hide button
    butInstall.classList.toggle('hidden', true);
});


window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
