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
            const url = activeTab.url;

            // Check if the user is on the required Instagram page
            if (!url.startsWith('https://www.instagram.com/explore/people/')) {
                const message = 'Visit this link https://www.instagram.com/explore/people/ and then click on the Follow button above.';
                statusDiv.textContent = message; // Show the message in the popup
                chrome.storage.local.set({ statusMessage: message }); // Save the message in storage
                return;
            }

            // If the user is on the correct page, execute the follow script
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
