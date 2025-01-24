(() => {
    let followCount = 0; 
    const followLimit = 10; 

    async function tryFollow() {
        const buttons = document.querySelectorAll('button');
        let followableButtons = Array.from(buttons).filter(button => button.textContent.trim() === 'Follow');

        if (followableButtons.length === 0) {
            const message = 'You have followed everyone on this page. Refreshing the page...';
            chrome.runtime.sendMessage({ message }); // Notify popup
            chrome.storage.local.set({ statusMessage: message }); // Save message
            setTimeout(() => {
                chrome.storage.local.set({ statusMessage: '' }); // Clear message before refresh
                location.reload(); 
            }, 4000);
            return;
        }

        for (const button of followableButtons) {
            if (followCount >= followLimit) {
                const message = `Follow limit of ${followLimit} reached.`;
                chrome.runtime.sendMessage({ message }); // Notify popup
                chrome.storage.local.set({ statusMessage: message }); // Save message
                console.log(message);
                return; 
            }

            button.textContent = 'Processing ...';
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
            button.click();
            button.textContent = 'Following';
            button.disabled = true; 
            button.style.backgroundColor = '#00ff00';
            followCount++;

            const message = `${followCount} people followed.`;
            chrome.runtime.sendMessage({ message }); // Notify popup
            chrome.storage.local.set({ statusMessage: message }); // Save message
        }

        if (followCount < followLimit) {
            setTimeout(tryFollow, 2000); // Retry after 2 seconds if there are more buttons
        }
    }

    tryFollow();
})();
