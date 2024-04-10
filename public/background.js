chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("Received message from content script:", request);
    }
);
