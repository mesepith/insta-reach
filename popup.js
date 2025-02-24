document.addEventListener('DOMContentLoaded', function () {
    const followButton = document.getElementById('followButton');
    const statusDiv = document.getElementById('statusMessage'); // Div to display status messages

    // Function to update and control the visibility of the status message
    function updateStatusMessage() {
        chrome.storage.local.get('statusMessage', function (result) {
            if (result.statusMessage) {
                statusDiv.textContent = result.statusMessage;
                statusDiv.style.display = 'block'; // Show the message
            } else {
                statusDiv.textContent = '';
                statusDiv.style.display = 'none'; // Hide the message
            }
        });
    }

    // Listen for real-time messages from the content script
    chrome.runtime.onMessage.addListener((request) => {
        if (request.message) {
            chrome.storage.local.set({ statusMessage: request.message }, () => {
                updateStatusMessage(); // Update the message in the popup
            });
        }
    });

    // Follow button functionality
    followButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const activeTab = tabs[0];
            const url = activeTab.url;

            if (!url.startsWith('https://www.instagram.com/explore/people/')) {
                const message = "Visit this link https://www.instagram.com/explore/people/ and then click on the Follow button above.";

                chrome.storage.local.set({ statusMessage: message }, () => {
                    updateStatusMessage(); // Show the message in the popup
                });
                return;
            }

            // Clear any previous messages
            chrome.storage.local.set({ statusMessage: '' }, () => {
                updateStatusMessage();
            });

            // Inject the follow script
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

    // Update the message when the popup is opened
    updateStatusMessage();
});
