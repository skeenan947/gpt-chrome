chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'openSettings',
    title: 'Open Settings',
    contexts: ['action'],
  }, () => {
    console.log("Context menu created successfully");
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openSettings') {
    chrome.tabs.create({ url: chrome.runtime.getURL('settings.html') });
  }
});

chrome.action.onClicked.addListener((tab) => {
  // Open the side panel when the extension icon is clicked
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error("Error opening side panel:", error));
});