// Function to generate a random nonce
function generateNonce() {
    try {
        const array = new Uint8Array(16);
        window.crypto.getRandomValues(array);
        return btoa(String.fromCharCode.apply(null, array));
    } catch (error) {
        console.error('Error generating nonce:', error);
        return null;
    }
}

const nonce = generateNonce();

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});

chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({ url: 'popup.html' });
});

// Update tab title with the latest score
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'UPDATE_TITLE') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: (title) => { document.title = title; },
                    args: [request.title],
                    world: 'MAIN',
                    nonce: nonce
                });
            }
        });
    }
});
