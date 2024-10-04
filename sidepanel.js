document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('sendBtn');
    const clearBtn = document.getElementById('clearBtn'); // New line
    const userInput = document.getElementById('userInput');
    const contentDisplay = document.getElementById('contentDisplay');

    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
        console.log("Send button event listener attached"); // Debugging log
    } else {
        console.error("sendBtn element not found");
    }

    if (clearBtn) { // New block
        clearBtn.addEventListener('click', clearConversation);
        console.log("Clear button event listener attached");
    } else {
        console.error("clearBtn element not found");
    }

    if (userInput) {
        userInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                sendMessage();
            }
        });
        console.log("Enter key event listener attached to userInput"); // Debugging log
    } else {
        console.error("userInput element not found");
    }

    // Query the active tab and execute a script to get the page content
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabs[0].id },
                func: () => document.body.innerText
            },
            (results) => {
                if (results && results[0]) {
                    contentDisplay.textContent = results[0].result;
                } else {
                    contentDisplay.textContent = 'Failed to retrieve content.';
                }
            }
        );
    });
});

chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        chrome.scripting.executeScript(
            {
                target: { tabId: tab.id },
                func: () => document.body.innerText
            },
            (results) => {
                if (results && results[0]) {
                    contentDisplay.textContent = results[0].result;
                } else {
                    contentDisplay.textContent = 'Failed to retrieve content.';
                }
            }
        );
    });
});

async function sendMessage() {
    console.log("sendMessage function called"); // Debugging log

    const input = document.getElementById('userInput').value.trim();
    if (input === '') {
        console.log("Input is empty"); // Debugging log
        return;
    }

    const chatWindow = document.getElementById('chatArea');
    const userMessageDiv = document.createElement('div');

    // Label the user message
    const formattedMessage = `<strong>User:</strong> ${input}`;

    userMessageDiv.innerHTML = formattedMessage;
    userMessageDiv.style.marginBottom = '10px';
    chatWindow.appendChild(userMessageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    document.getElementById('userInput').value = '';

    // Get the page content
    const pageContent = document.body.innerText;
    console.log("Page content:", pageContent); // Debugging log

    const apiKey = await getApiKey();
    console.log("API Key:", apiKey); // Debugging log

    try {
        const response = await callOpenAI(pageContent, input, apiKey);
        const assistantMessageDiv = document.createElement('div');

        // Label the agent response
        assistantMessageDiv.innerHTML = `<strong>Agent:</strong> ${formatMessage(response)}`;
        assistantMessageDiv.style.marginBottom = '10px';
        chatWindow.appendChild(assistantMessageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    } catch (error) {
        const errorMessageDiv = document.createElement('div');
        errorMessageDiv.textContent = `Error: ${error.message}`;
        errorMessageDiv.style.marginBottom = '10px';
        errorMessageDiv.style.color = 'red';
        chatWindow.appendChild(errorMessageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
}

function formatMessage(message) {
    const escapeHTML = (str) => str.replace(/&/g, '&amp;')
                                   .replace(/</g, '&lt;')
                                   .replace(/>/g, '&gt;')
                                   .replace(/"/g, '&quot;')
                                   .replace(/'/g, '&#039;');

    // Replace text in triple backticks with a formatted code block
    return message
        .replace(/```(\w+)?\s*([^`]+)```/g, (match, codeType, code) => {
            const escapedCode = escapeHTML(code);
            const languageClass = codeType ? ` class="language-${codeType}"` : '';
            return `<pre${languageClass} style="background-color: #f8f8f8; border: 1px solid #ccc; border-radius: 5px; padding: 5px; white-space: pre-wrap; margin-left: 30px; color: #333;"><code>${escapedCode}</code></pre>`;
        })
        .replace(/`([^`]+)`/g, (match, p1) => `<code style="background-color: #f8f8f8; border: 1px solid #ccc; border-radius: 3px; padding: 2px; margin-left: 20px; color: #333;">${escapeHTML(p1)}</code>`)
        .replace(/\n/g, '<br>'); // Convert newlines to <br> for HTML display
}

async function callOpenAI(pageContent, input, apiKey) {
    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: `The user has a question or request related to the following content: "${pageContent}". User's input: "${input}".` }
    ];
  
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Updated model
        messages: messages,
        max_tokens: 1500
      })
    });
  
    if (!response.ok) {
      throw new Error(`OpenAI API returned an error: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data.choices[0].message.content;
}

function getApiKey() {
    return new Promise((resolve) => {
      chrome.storage.sync.get('apiKey', (data) => {
        resolve(data.apiKey);
      });
    });
}

function clearConversation() { // New function
    const chatWindow = document.getElementById('chatArea');
    chatWindow.innerHTML = '';
    console.log("Conversation cleared"); // Debugging log
}