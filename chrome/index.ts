async function getCurrentTab() {
  let queryOptions = { };
  let tab = await chrome.tabs.query(queryOptions);
  return tab;
}

async function getalltabs() {
  let [tab]= await chrome.tabs.query({})
  return tab; 
}

export const somefunctions = {
  getCurrentTab,
  getalltabs
};
