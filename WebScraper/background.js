// In your background.js or service worker
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message);
    // Respond or handle message
});
