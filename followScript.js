(() => {
    let followCount = 0; 
    const followLimit = 10; 

    function tryFollow() {
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

        followableButtons.forEach(button => {
            if (followCount < followLimit) {
                button.textContent = 'Processing ...';
                setTimeout(() => {
                    button.click(); 
                    button.textContent = 'Following'; 
                    button.disabled = true; 
                    button.style.backgroundColor = '#00ff00'; 
                }, 500); 
                followCount++; 
            }
        });

        const message = `${followCount} people followed.`;
        chrome.runtime.sendMessage({ message }); // Notify popup
        chrome.storage.local.set({ statusMessage: message }); // Save message

        if (followCount >= followLimit) {
            console.log(`Follow limit of ${followLimit} reached.`);
            return; 
        }

        setTimeout(tryFollow, 2000);
    }

    tryFollow();
})();
