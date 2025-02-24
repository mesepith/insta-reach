(() => {
    let followCount = 0;
    const followLimit = 10;

    async function tryFollow() {
        const buttons = document.querySelectorAll('button');
        let followableButtons = Array.from(buttons).filter(button => button.textContent.trim() === 'Follow');

        if (followableButtons.length === 0) {
            const message = 'You have followed everyone on this page. Refreshing the page...';
            chrome.runtime.sendMessage({ message }); // Notify popup

            setTimeout(() => {
                // Clear the message before refreshing the page
                chrome.storage.local.set({ statusMessage: '' }, () => {
                    location.reload(); // Refresh the page
                });
            }, 4000);

            return;
        }

        for (const button of followableButtons) {
            if (followCount >= followLimit) {
                const message = `Follow limit of ${followLimit} reached.`;
                chrome.runtime.sendMessage({ message }); // Notify popup
                chrome.storage.local.set({ statusMessage: message }); // Save the message

                // Notify popup.js to stop the spinner and restore the button
                chrome.runtime.sendMessage({ status: 'completed' });

                return;
            }

            button.textContent = 'Processing ...';
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before clicking
            button.click();
            button.textContent = 'Following';
            button.disabled = true; // Disable the button after following
            button.style.backgroundColor = '#00ff00'; // Change button background
            followCount++;

            const message = `${followCount} people followed.`;
            chrome.runtime.sendMessage({ message }); // Notify popup
            chrome.storage.local.set({ statusMessage: message }); // Save the message
        }

        if (followCount < followLimit) {
            setTimeout(tryFollow, 2000); // Retry after 2 seconds if there are more buttons
        } else {
            setTimeout(() => {
                chrome.runtime.sendMessage({ status: 'completed' }); // Notify popup
            }, 1000); // Delay to ensure message is sent
        }
        
    }

    tryFollow();
})();
