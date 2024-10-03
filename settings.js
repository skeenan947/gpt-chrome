document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey');
  const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
  const statusDiv = document.getElementById('status');

  // Load the saved API key and display it in the input field
  chrome.storage.sync.get('apiKey', (data) => {
    if (data.apiKey) {
      apiKeyInput.value = data.apiKey;
    }
  });

  // Save the API key when the button is clicked
  saveApiKeyBtn.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    if (apiKey) {
      chrome.storage.sync.set({ apiKey: apiKey }, () => {
        statusDiv.textContent = 'API key saved successfully!';
        setTimeout(() => {
          statusDiv.textContent = '';
        }, 2000);
      });
    } else {
      statusDiv.style.color = 'red';
      statusDiv.textContent = 'Please enter a valid API key.';
      setTimeout(() => {
        statusDiv.textContent = '';
        statusDiv.style.color = 'green';
      }, 2000);
    }
  });
});
