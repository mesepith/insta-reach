(() => {
    // Counter to keep track of follows
    let followCount = 0; 
    const followLimit = 10; // Maximum number of follows allowed per button click

    function tryFollow() {
        // Loop through all buttons visible on the page
        const buttons = document.querySelectorAll('button');
        let followableButtons = Array.from(buttons).filter(button => button.textContent === 'Follow');

        // If no "Follow" buttons are left, display a message and refresh the page
        if (followableButtons.length === 0) {
            console.log('You have followed everyone on this page.');
            alert('You have followed everyone on this page. Refreshing the page...');
            setTimeout(() => {
                location.reload(); // Refresh the page after 4 seconds
            }, 4000);
            return;
        }

        followableButtons.forEach(button => {
            if (followCount < followLimit) {
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
