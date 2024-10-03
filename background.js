// Create the context menu when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
      id: 'openSettings',
      title: 'Open Settings',
      contexts: ['action'], // Ensure the context is set to 'action'
  }, () => {
      console.log("Context menu created successfully");
  });
});

// Handle clicks on the context menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log("Context menu item clicked:", info.menuItemId);
  if (info.menuItemId === 'openSettings') {
      chrome.tabs.create({ url: chrome.runtime.getURL('settings.html') });
  }
});