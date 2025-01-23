document.addEventListener('DOMContentLoaded', function () {
    var followButton = document.getElementById('followButton');
    var statusDiv = document.getElementById('statusMessage'); // Add a div in the popup.html to show messages

    // Listen for messages from the content script
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.message) {
            statusDiv.textContent = request.message; // Update the popup with the message
        }
    });

    followButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var activeTab = tabs[0];

            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                func: () => { window.followCount = 0; } // Reset followCount
            }, () => {
                chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    files: ['followScript.js']
                });
            });
        });
    });
});
