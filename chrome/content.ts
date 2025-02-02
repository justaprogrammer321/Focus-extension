let blockedsitesarray = [];

// Get the blocked sites from local storage
chrome.storage.local.get('blockedsites', (item) => {
  if (chrome.runtime.lastError) {
    console.error("Storage error:", chrome.runtime.lastError);
  } else {
    const blockedsites = JSON.parse(item.blockedsites || "[]");
    blockedsitesarray = blockedsites;

    for (let i = 0; i < blockedsitesarray.length; i++) {
      console.log(blockedsitesarray[i]);
      console.log(window.location.origin);
      if (window.location.origin === blockedsitesarray[i]) {
        document.body.innerHTML = `<p>This is a blocked link: ${blockedsitesarray[i]}</p>`;
        break;  
      }
    }
  }
});
