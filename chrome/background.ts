let tabStartTime = {};  // Store start time for each tab
let tabDurations = {};  // Store total durations for each tab
let tabURL: string | undefined = "";

// When a tab is activated
chrome.tabs.onActivated.addListener((activeInfo) => {
    const tabId = activeInfo.tabId;

    const now = Date.now();

    // If this tab was previously active, stop the previous duration tracking
    if (tabStartTime[tabId]) {
        const duration = now - tabStartTime[tabId];
        chrome.tabs.get(tabId, (tab) => {
            if (chrome.runtime.lastError) {
              console.error("Error getting tab:", chrome.runtime.lastError);
            } else {
            //   console.log("Tab URL:", tab.url);
              tabURL=tab.url
            }
          });
          
        tabDurations[tabId] = (tabDurations[tabId] || 0) + duration;
    }

    // Start tracking this tab's usage
    tabStartTime[tabId] = now;
});

// When a tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
    const now = Date.now();

    // If the tab was tracked, update the duration
    if (tabStartTime[tabId]) {
        const duration = now - tabStartTime[tabId];
        tabDurations[tabId] = (tabDurations[tabId] || 0) + duration;

        //to set the local storage
        chrome.storage.local.set({ myKey: `${tabDurations[tabId]},${tabURL}` }, () => {
            if (chrome.runtime.lastError) {
              console.error("Storage error:", chrome.runtime.lastError);
            } else {
              console.log("Data saved successfully!",tabURL);
            }
        });
          
        delete tabStartTime[tabId];
    }
    // localStorage.setItem("tabduration",tabDurations[tabId])
    console.log(tabDurations[tabId])
});

// Function to get tab usage durations (you can send this data to a popup or store it)
function getTabDurations() {
    return tabDurations;
}

//testing the message feature
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  console.log("Message from content script:", request.data);

  sendResponse({ response: "Received your message!" }); // Optional response

});
