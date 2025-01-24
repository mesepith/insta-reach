(() => {
    let followCount = 0;
    const followLimit = 10;

    async function tryFollow() {
        const buttons = document.querySelectorAll('button');
        let followableButtons = Array.from(buttons).filter(button => button.textContent.trim() === 'Follow');

        if (followableButtons.length === 0) {
            const message = 'You have followed everyone on this page. Refreshing the page...';
            chrome.runtime.sendMessage({ message }); // Notify popup
            chrome.storage.local.set({ statusMessage: message }); // Save the message

            setTimeout(() => {
                // Clear the message before the refresh
                chrome.storage.local.set({ statusMessage: '' });
                location.reload(); // Refresh the page
            }, 4000);

            return;
        }

        for (const button of followableButtons) {
            if (followCount >= followLimit) {
                const message = `Follow limit of ${followLimit} reached.`;
                chrome.runtime.sendMessage({ message }); // Notify popup
                chrome.storage.local.set({ statusMessage: message }); // Save the message
                return; // Stop once the follow limit is reached
            }

            button.textContent = 'Processing ...';
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before clicking
            button.click(); // Click the "Follow" button
            button.textContent = 'Following';
            button.disabled = true; // Disable the button after following
            button.style.backgroundColor = '#00ff00'; // Change the button's background to green
            followCount++;

            const message = `${followCount} people followed.`;
            chrome.runtime.sendMessage({ message }); // Notify popup
            chrome.storage.local.set({ statusMessage: message }); // Save the message
        }

        if (followCount < followLimit) {
            setTimeout(tryFollow, 2000); // Retry after 2 seconds if there are more buttons to follow
        }
    }

    tryFollow();
})();
