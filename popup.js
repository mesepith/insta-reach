document.addEventListener('DOMContentLoaded', function() {
    var followButton = document.getElementById('followButton');
    followButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];

            // Inject a script to reset the followCount before running followScript.js
            chrome.scripting.executeScript({
                target: {tabId: activeTab.id},
                func: () => { window.followCount = 0; } // Reset the follow counter in the page context
            }, () => {
                chrome.scripting.executeScript({
                    target: {tabId: activeTab.id},
                    files: ['followScript.js']  // Execute the followScript.js in the tab
                });
            });
        });
    });
});
