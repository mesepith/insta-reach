document.addEventListener('DOMContentLoaded', function () {
    const followButton = document.getElementById('followButton');
    const statusDiv = document.getElementById('statusMessage'); // Div to display status messages

    // Retrieve and display the message from storage when the popup loads
    chrome.storage.local.get('statusMessage', function (result) {
        if (result.statusMessage) {
            statusDiv.innerHTML = result.statusMessage; // Render as HTML
        }
    });

    // Listen for real-time messages from the content script
    chrome.runtime.onMessage.addListener((request) => {
        if (request.message) {
            statusDiv.innerHTML = request.message; // Update the popup with the message as HTML
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
                const message = `
                    Visit this link: 
                    <a id="redirectLink" href="#" style="color: #007bff; text-decoration: underline;">
                        https://www.instagram.com/explore/people/
                    </a> 
                    and then click on the Follow button above.
                `;
                statusDiv.innerHTML = message; // Render as HTML

                // Add click event listener to the link
                const redirectLink = document.getElementById('redirectLink');
                redirectLink.addEventListener('click', function (event) {
                    event.preventDefault(); // Prevent the default link behavior
                    chrome.tabs.update(activeTab.id, { url: 'https://www.instagram.com/explore/people/' });
                });

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
