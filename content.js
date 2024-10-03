chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getPageContent') {
        const pageContent = document.body.innerText;
        sendResponse({ content: pageContent });
    } else if (request.action === 'toggleSidebar') {
        try {
            chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
            sendResponse({ status: "Sidebar toggled" });
        } catch (error) {
            console.error("Error handling message:", error);
            sendResponse({ status: "Error", message: error.message });
        }
    }
});

// Log the page content
console.log("Page content:", document.body.innerText);

// Send the page content back to the background script
chrome.runtime.sendMessage({ content: document.body.innerText }, (response) => {
    if (!document.location.href.startsWith('chrome://')) {
        chrome.runtime.sendMessage({ content: document.body.innerText }, (response) => {
            if (chrome.runtime.lastError) {
                console.error("Error sending message:", chrome.runtime.lastError.message);
            } else {
                console.log("Response from background:", response);
            }
        });
    }
    if (chrome.runtime.lastError) {
        console.error("Error sending message:", chrome.runtime.lastError.message);
    } else {
        console.log("Response from background:", response);
    }
});
