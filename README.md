# ChatGPT Content Assistant Chrome Extension

This extension allows users to chat with the page on their current tab, asking questions of the content, and carrying on the conversation across multiple clicks / tabs.  All you need to do is to provide it an API Key

This guide will walk you through the process of installing the **ChatGPT Content Assistant** Chrome extension directly from its GitHub repository and provide usage instructions.

## Prerequisites

- Ensure you have Google Chrome installed on your computer.
- Basic knowledge of using GitHub and navigating file systems.

## Installation Steps

1. **Download the Extension**:
- Go to the GitHub repository for the ChatGPT Content Assistant.
- Click on the green "Code" button, then select "Download ZIP" from the dropdown menu.

2. **Extract the ZIP File**:
- Locate the downloaded ZIP file (usually in your Downloads folder).
- Right-click on the ZIP file and select "Extract All..." (or use an extraction tool of your choice).
- Choose a destination folder to extract the files.

3. **Open Chrome and Access Extensions**:
- Launch Google Chrome.
- Click on the menu icon (three vertical dots in the top-right corner).
- Navigate to More tools > Extensions.

4. **Enable Developer Mode**:
- On the Extensions page, toggle the switch for "Developer mode" in the top-right corner. This will enable additional options for extension management.

5. **Load the Unpacked Extension**:
- Click the “Load unpacked” button.
- In the dialog that opens, navigate to the folder where you extracted the ZIP file.
- Select the folder that contains the manifest.json file (this is usually the root folder of the extension you downloaded).

6. **Verify Installation**:
- After successfully loading the extension, you should see the **ChatGPT Content Assistant** listed among your installed extensions.
- If you encounter any errors, ensure the manifest.json file is present.

## Usage Instructions

1. **Add Your OpenAI API Key**:
- Right Click on the extension icon in the toolbar and click "Open Settings".
- Enter your OpenAI API key in the provided input field and click "Save" to store it securely.

2. **Using the Extension**:
- Click on the extension icon in the toolbar to bring up the sidebar.
- The sidebar will allow you to interact with the current web page content using the ChatGPT model.
- Choosing a different tab will allow you to continue your chat with the context from the previous page.  Click "Clear Conversation" if you don't want the previous context to carry over.
- Follow any additional setup instructions provided in the extension interface.

## Notes

- You can modify the local source code if needed. Just remember to reload the extension from the Extensions page after making changes.

For more information, refer to the [ChatGPT Content Assistant GitHub repository](https://github.com/skeenan947/gpt-chrome).

Happy browsing!
