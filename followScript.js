(() => {
    let followCount = 0; 
    const followLimit = 10; 

    function tryFollow() {
        const buttons = document.querySelectorAll('button');
        let followableButtons = Array.from(buttons).filter(button => button.textContent === 'Follow');

        if (followableButtons.length === 0) {
            chrome.runtime.sendMessage({ message: 'You have followed everyone on this page. Refreshing the page...' });
            setTimeout(() => {
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

        chrome.runtime.sendMessage({ message: `${followCount} people followed.` });

        if (followCount >= followLimit) {
            console.log(`Follow limit of ${followLimit} reached.`);
            return; 
        }

        setTimeout(tryFollow, 2000);
    }

    tryFollow();
})();
