export function sendDataToBackground() {

    chrome.runtime.sendMessage({ data: "Hello from content script!" }, function(response) {
  
      console.log("Response from background script:", response);
  
    });
  
  }
  