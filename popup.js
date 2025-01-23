document.addEventListener('DOMContentLoaded', function () {
    const followButton = document.getElementById('followButton');
    const statusDiv = document.getElementById('statusMessage'); // Div to display status messages

    // Retrieve and display the message from storage when the popup loads
    chrome.storage.local.get('statusMessage', function (result) {
        if (result.statusMessage) {
            statusDiv.textContent = result.statusMessage;
        }
    });

    // Listen for real-time messages from the content script
    chrome.runtime.onMessage.addListener((request) => {
        if (request.message) {
            statusDiv.textContent = request.message; // Update the popup with the message
        }
    });

    // Clear the status message and run the follow script
    followButton.addEventListener('click', function () {
        statusDiv.textContent = ''; // Clear the previous message

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const activeTab = tabs[0];

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
