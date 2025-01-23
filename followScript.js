(() => {
    // Counter to keep track of follows
    let followCount = 0; 
    const followLimit = 10; // Maximum number of follows allowed per button click

    function tryFollow() {
        // Loop through all buttons visible on the page
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.textContent === 'Follow' && followCount < followLimit) {
                button.click();
                button.textContent = 'Following'; // Change the button text as a sign of completion
                button.disabled = true; // Optional, disable the button
                button.style.backgroundColor = '#00ff00'; // Change background to green for visual feedback
                followCount++; // Increment the follow counter
            }
        });

        // Stop the loop if the limit is reached
        if (followCount >= followLimit) {
            console.log(`Follow limit of ${followLimit} reached.`);
            return; // Exit the function
        }

        // Recall the function after a delay to cater to new dynamically loaded content
        setTimeout(tryFollow, 2000);
    }

    // Initial call to start the process
    tryFollow();
})();
