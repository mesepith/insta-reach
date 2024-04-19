document.addEventListener('DOMContentLoaded', function() {
    var followButton = document.getElementById('followButton');
    followButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            chrome.scripting.executeScript({
                target: {tabId: activeTab.id},
                files: ['followScript.js']  // Execute the followScript.js in the tab
            });
        });
    });
});
