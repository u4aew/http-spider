chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.type) {
            case 'xhr': {
                console.log("Received message from content script:", request);
                break
            }
            case 'STOP_REC': {
                chrome.storage.local.set({ myData: 'someValue' }, function() {
                    chrome.tabs.create({ url: chrome.runtime.getURL("index.html/#schema") });
                });
            }
        }

    }
);
